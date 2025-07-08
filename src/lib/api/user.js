export async function initUser({ email, clerkId, name, imageUrl }) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, clerkId, name, imageUrl }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    return data.user;
  } catch (err) {
    console.error("User init error:", err.message);
    return null;
  }
}
