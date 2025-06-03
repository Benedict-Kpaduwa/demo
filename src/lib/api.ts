export const fetchData = async (url: string, token: string | null) => {
    const res = await fetch(`http://localhost:5000${url}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
};