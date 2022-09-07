import mondaySdk from "monday-sdk-js";


const monday = mondaySdk();
// const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s"
// const TOKEN2 = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3ODY4NTYzNiwidWlkIjozMzY3MDEwMCwiaWFkIjoiMjAyMi0wOS0wMVQxNTowOToyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.KyArAeAxG2O6-RdVW1jf4QLRXheyD2eGhR-pekPpKPU";


// monday.setToken(TOKEN);

export async function findGreenBoardService(boardName) {

    const query = `query {     
                        boards {
                            id
                            name
                        }
                   }`;
    try {
        const res = await monday.api(query);
        console.log('findGreenBoardService():', res);
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }

        const board = res.data.boards.find(board => board.name === boardName);
        return typeof board !== 'undefined' ? board.id : -1;

    } catch (e) {
        console.log('Exception in findGreenBoardService():', e)
        return null;
    }
}

export async function findBoardListService() {

    const query = `query {     
                        boards {
                            id
                            name
                        }
                   }`;
    try {
        const res = await monday.api(query);
        console.log('findBoardListService():', res);
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }

        return  res.data.boards;

    } catch (e) {
        console.log('Exception in findBoardListService():', e)
        return null;
    }
}



export async function createGreenBoardService() {
    const query = `mutation {
                            create_board (board_name: "Green Board", board_kind: public) {
                                id
                            }
                        }`;

    try {
        const res = await monday.api(query);
        console.log('createBoardService():', res);
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }

        return res.data.create_board.id;
    } catch (e) {
        console.log('Exception in createBoardService():', e);
        return null;
    }


}

export async function deleteGroupService(groupId, boardId) {
    const query = `mutation {
                        delete_group (board_id: ${boardId}, group_id: ${groupId}) {
                            id
                        }
                    }`

    try {
        const res = await monday.api(query);
        console.log('deleteGroupService():', res);
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }
        return res.data.delete_group.id;
    } catch (e) {
        console.log('Exception in deleteGroupService():', e);
        return null;
    }

}

export async function createGroupAndColumnsService(boardId) {
    const query = `mutation {
                    create_group: create_group (board_id: ${boardId}, group_name: "Ranking") {
                        id
                    }
                    person: create_column(board_id: ${boardId}, title:"Person", description: "Person's profile picture", column_type:people) {
                        id
                    }
                    eco_points: create_column(board_id: ${boardId}, title:"Eco Points", description: "Points gained by being green", column_type:text) {
                        id
                    }
                    carbon_emissions:create_column(board_id: ${boardId}, title:"Carbon Emissions", description: "Carbon emissions", column_type:text) {
                        id
                    }
                    eco_status: create_column(board_id: ${boardId}, title:"Eco Status", description: "Contribution status of a person", column_type:status) {
                        id
                    }
                }`

    try {
        const res = await monday.api(query);
        console.log('createGroupAndColumnsService():', res);
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }
        return res
    } catch (e) {
        console.log('Exception in createGroupAndColumnsService():', e);
        return null
    }
}

export async function createItemService(user, groupId, boardId) {
    const query = `mutation {
                        create_item (board_id: ${boardId}, group_id: "${groupId}", item_name: "${user.name}", 
                            column_values: "{ \\"person\\" : {\\"personsAndTeams\\":[{\\"id\\":${user.id},\\"kind\\":\\"person\\"}]}, \\"eco_points\\" : \\"${user.points}\\", \\"carbon_emissions\\" : \\"${user.cfp}\\", \\"eco_status\\" : {\\"label\\" : \\"${user.status}\\"} }", create_labels_if_missing: true ) {
                                id
                         }
                    }`
    try {
        const res = await monday.api(query);
        console.log('createItemService():', res)
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }
        return res.data.create_item.id;

    } catch (e) {
        console.log('Exception in createItemService():', e);
        return null;
    }

}

export async function fetchBoardService(boardId) {
    const query = `
                query {
                 
                  
                  boards(ids: ${boardId}) {
                    name
                    
                    columns {
                      title
                      id
                      type
                    }
                    
                    groups {
                      title
                      color
                      id
                    }
                    
                    items (limit:100){
                      id
                      name
                      group {
                        id
                      }
                      
                      column_values {
                        id
                        value
                        text
                      }
                    }
                  }
                } 
                
                `;
    try {
        const res = await monday.api(query);
        console.log('fetchBoardService():', res)
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }
        if (res.data.boards.length !== 0) return res.data.boards[0]
        else return -1
    } catch (e) {
        console.log('Exception in fetchBoardService():', e)
        return null;
    }
}

export async function findUserItemInBoardService(boardId, userId) {

    const query = `query {
                        boards(ids: ${boardId}) {
                            items {
                                id
                                column_values(ids: person){
                                    value
                                }
                            }
                        }  
                    }
            `;
    try {
        const res = await monday.api(query);
        console.log('findUserItemInBoardService():', res)
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }
        if (res.data.boards[0].items.length === 0) return -1
        const users = res.data.boards[0].items.filter((item) =>
            JSON.parse(item.column_values[0].value).personsAndTeams[0].id.toString() === userId.toString()
        )

        return users.length === 0 ? -1 : users[0].id;
    } catch (e) {
        console.log('Exception in findUserItemInBoardService():', e)
        return null;
    }
}

export async function updateUserCFPService(boardId, itemId, cfp, status) {
    const query = `mutation {
                      change_multiple_column_values(item_id:${parseInt(itemId)}, board_id:${boardId}, column_values: "{\\"carbon_emissions\\" : \\"${cfp}\\", \\"eco_status\\" : {\\"label\\" : \\"${status}\\"} }", create_labels_if_missing: true) {
                        id
                      }
                    }`

    try {
        const res = await monday.api(query);
        console.log('updateUserCFPService():', res)
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }
        return res.data.change_multiple_column_values.id
    } catch (e) {
        console.log('Exception in updateUserCFPService():', e)
        return null;
    }

}

export async function updateUserPointsService(boardId, itemId, points) {
    const query = `mutation {
                      change_multiple_column_values(item_id:${parseInt(itemId)}, board_id:${boardId}, column_values: "{\\"eco_points\\" : \\"${points}\\"}") {
                        id
                      }
                    }`

    try {
        const res = await monday.api(query);
        console.log('updateUserPointsService():', res)
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }
        return res.data.change_multiple_column_values.id
    } catch (e) {
        console.log('Exception in updateUserPointsService():', e)
        return null;
    }
}

export async function getCurrentUserService(){
    const query = `query {
                        me {
                            name
                            id
                        }          
                   }`

    try {
        const res = await monday.api(query);
        console.log('getCurrentUserService():', res)
        if ('error_code' in res && res.error_code === 'ComplexityException') {
            return 'ComplexityException';
        }

        return res.data.me


    } catch (e) {
        console.log('Exception in getCurrentUserService():', e)
        return null;
    }
}

export async function openModalService(itemId){
    console.log(itemId)
    monday.execute('openItemCard', {itemId: itemId})
}
