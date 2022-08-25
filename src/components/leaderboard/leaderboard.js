import React from "react";
import "./leaderboard.css";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardId: null,
            users: [],
            groupId: null,
        }

    }


    data = {
        "users": [
            {
                "": ""
            },
            {}
        ],

        "board_id": -1
    }

    componentDidMount() {
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');
        this.setState({boardId: this.data.board_id})

    }

    getUsers = () => {
       const  query = `
                query{
                  users{
                    id
                    name
                    photo_thumb
                  }
                }
        `
        monday.api(query).then((res) => {
            this.setState({users: res.data.users}, this.createBoard)
        });
    }

    isBoardCreated () {
        return this.data.board_id !== -1;
    }

    createColumns = () => {
        const query = `mutation{
                      a: create_column(board_id: ${parseInt(this.state.boardId)}, title:"Profile Picture", description: "Person's profile picture", column_type:people) {
                        id
                        title
                        description
                      }
                      b: create_column(board_id: ${parseInt(this.state.boardId)}, title:"Name", description: "Person' name", column_type:text) {
                        id
                        title
                        description
                      }
                      c: create_column(board_id: ${parseInt(this.state.boardId)}, title:"Eco Points", description: "Points gained by being green", column_type:text) {
                        id
                        title
                        description
                      }
                      d:create_column(board_id: ${parseInt(this.state.boardId)}, title:"Carbon Emissions", description: "Carbon emissions", column_type:text) {
                        id
                        title
                        description
                      }
                   }`
        monday.api(query).then((res) =>{
            console.log(res);
            this.setGroupId();
        } );
    }
    createBoard = () => {
        const userIds = this.state.users.map(user =>  parseInt(user.id))
        console.log(userIds);
        if (this.isBoardCreated()) {

            console.log("Board Exists")
        } else {
            const query = `mutation {
                        create_board (board_name: "Green Board", board_kind: public, board_subscriber_ids: [${userIds}]) {
                            id
                            }
                        }
                      `;
            monday.api(query)
                .then((res) => {
                    console.log(res);
                    this.setState({boardId: res.data.create_board.id}, this.createColumns);
                });
        }


    };

    setGroupId = () => {
        const query = `query {
                            boards (ids: ${this.state.boardId}) {
                                groups {
                                    id
                                }
                            }
                        }`
        monday.api(query)
            .then((res) => {
                console.log(res);
                this.setState({groupId: res.data.boards[0].groups[0].id}, this.createItems);

            });
    }

    saveBoard = () => {

    }


    render() {
        return (
            <div className="leaderboard">
                <button onClick={this.getUsers}>Create Board</button>
                <p>Board Created: {this.state.boardId}</p>

            </div>
        );
    }


    createItems = () => {

    }

    insertColumnValues = () => {
        console.log(this.state.groupId)
    }
}

export default Leaderboard;
