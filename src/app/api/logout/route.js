export async function POST() {
    return new Response(
        JSON.stringify({ message: "Logged out successfully" }),
        {
            status: 200,
            headers: {
                "Set-Cookie": "token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;",
            },
        }
    );
}
