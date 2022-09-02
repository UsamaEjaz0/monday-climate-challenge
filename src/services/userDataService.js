


export async function findById (id){
    try {
        let res = await fetch("https://www.car7parts.ae/monday/user-data/find", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({id: id.toString()})
        })
        return await res.json();
    }catch (e) {
        console.log("[MongoDb] findById(): ", e)
        return null;
    }
}

export async function findByIds (ids){
    try {
        let res = await fetch("https://www.car7parts.ae/monday/user-data/find-all-ids", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({ids: ids})
        })
        return await res.json();
    }catch (e) {
        console.log("[MongoDb] findByIds(): ", e)
        return null;
    }
}

export async function insertRecord  (data) {
    try {
        const res = await fetch("https://www.car7parts.ae/monday/user-data/insert", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        return await res.json()
    }catch (e) {
        console.log("[MongoDb] insertRecord(): ", e)
        return null;
    }
}

export async function updateRecord  (user) {
    try {
        let res = await fetch("https://www.car7parts.ae/monday/user-data/update", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        return await res.json();
    }catch (e) {
        console.log("[MongoDb] updateRecord(): ", e)
        return null;
    }
}

export async function compareCFP (cfp) {
    try{
        let res = await fetch("https://www.car7parts.ae/monday/user-data/compare-cfp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cfp})
        });
        return await res.json();
    }catch (e) {
        console.log("[MongoDb] compareCFP(): ", e)
    }


}
