import index.tsx.*;

public class TelegramSender {
    private static final String BOT_TOKEN = "YOUR_BOT_TOKEN";
    private static final String CHAT_ID = "YOUR_CHAT_ID";

    public static void main(String[] args) {
        String message = "Hello, Telegram!";
        sendMessage(message);
    }

    private static void sendMessage(String message) {
        OkHttpClient client = new OkHttpClient();
        String url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage?chat_id=" + CHAT_ID + "&text=" + message;

        Request request = new Request.Builder()
                .url(url)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    System.out.println("Message sent successfully!");
                } else {
                    System.out.println("Error: " + response.message());
                }
            }
        });
    }
}
