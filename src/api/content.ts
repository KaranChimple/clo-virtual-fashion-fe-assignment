export const contentApi = {
  fetchContent: async (): Promise<any[]> => {
    const res = await fetch("https://closet-recruiting-api.azurewebsites.net/api/data");
    if (!res.ok) throw new Error("Failed to load data");
    return await res.json();
  }
};
