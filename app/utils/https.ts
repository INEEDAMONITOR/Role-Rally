export const getByCookies = async (endpoint: "user" | "role") => {
  const res = await (
    await fetch(`/api/${endpoint}`, {
      method: "GET",
      credentials: "include",
    })
  ).json();

  return res;
};

export const updateProfile = async (profile: any) => {
  const res = await (
    await fetch("/api/profile", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
  ).json();
  return res;
};
