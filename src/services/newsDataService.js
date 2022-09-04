export async function findRecords() {
  try {
      const res = await fetch("https://www.car7parts.ae/monday/news-data/find", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: getDateId()})
      })
      return await res.json()
  }catch (e) {
      console.log("[MongoDb] findRecords(): ", e)
      return null;
  }
}

const getDateId = () => {
  var date = new Date();
  return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}