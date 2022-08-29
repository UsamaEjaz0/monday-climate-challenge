
export async function findById (id){
    let res = await fetch("https://www.car7parts.ae/monday/user-data/find",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ id: id})
    })
    return await res.json();
}

export async function findByIds (ids){
    let res = await fetch("https://www.car7parts.ae/monday/user-data/find-all-ids",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ ids: ids})
    })
    return await res.json();
}

export async function insertRecord  (data) {
    const res = await fetch("https://www.car7parts.ae/monday/user-data/insert", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return await res.json()
}

export async function updateRecord  (user) {
    let res = await fetch("https://www.car7parts.ae/monday/user-data/update", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    return await res.json();
}
