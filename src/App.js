//import logo from './logo.svg';
import './App.css';
import { useState, useEffect }  from 'react';

import List from './Components/List/List';
import Pagination from './Components/Pagination/Pagination';
import ToggleSwitch from './Components/ToggleButton/ToggleButton';

// const defaultFriendList= [
//   {
//     name: "Dheeraj",
//     isFav: false,
//     id:1
//   },
//   {
//     name: "Tony stark",
//     isFav: false,
//     id:2
//   },
//   {
//     name: "ABC",
//     isFav: false,
//     id:3
//   },
//   {
//     name: "Dhiraj",
//     isFav: true,
//     id:4
//   },
// ]

import defaultFriendList from "./MOCK_DATA.json";

function App() {
  const [searchText, setSearchText] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [filteredFriendList, setFilteredFriendList] = useState([]);

  useEffect(()=>{
    setFriendList(defaultFriendList)
  },[])

  const handleNameChange = (event)=> {
   //console.log('event: ', event.target.value);
    let enteredValue = event.target.value;
    //console.log('enteredValue: ', enteredValue, enteredValue.trim().length);
    setSearchText(enteredValue)

    if(enteredValue.trim().length === 0){
      console.log("I am here")
      setFriendList(friendList)
      setFilteredFriendList([])
    } else {
       //filter Item
      let filteredName = friendList.filter((item)=>{
        console.log('item.name: ', item.name);
        if(item.name.toLowerCase().includes(enteredValue.toLowerCase())){
          return item;
        }
      });

      setFilteredFriendList(filteredName)
    }

  };

  const deleteFriend =(id)=>{
    //console.log('id: ', id);
    window.alert("do you want to delete your friend?")
    let filteredName = deleteFromList(friendList, id)
    setFriendList(filteredName)

    filteredFriendList.length && setFilteredFriendList(deleteFromList(filteredFriendList, id))
  }

  const makeFavorite =(friendList, id)=>{
    return friendList.map(x => (x.id === id ? { ...x, isFav: !x.isFav } : x));
  }

  const deleteFromList =(friendList, id)=>{
    return friendList.filter(item=>item.id !== id)
  }


  const favoriteToggle =(id)=>{
    const updatedData = makeFavorite(friendList, id) //friendList.map(x => (x.id === id ? { ...x, isFav: !x.isFav } : x));
    setFriendList(updatedData)
    filteredFriendList.length && setFilteredFriendList(makeFavorite(filteredFriendList, id))
  }

  const onChangePage =(item)=>{
    console.log('item: ', item);

  }

  const onSortBy  = (event)=>{
    console.log('event: ', event.target.checked);
    if(event.target.checked){
      const sortedData = friendList.sort(function(x, y) {
        let a1=x.isFav ? 1 : 0
        let b1=y.isFav? 1 : 0
        return a1-b1
      });
      setFriendList(sortedData)
      console.log('sortedData: ', sortedData);
    }

  }

  return (
    <>
      <div className="container">
        <div className="center">
          <h3>Friend List</h3>
          <span>
            <ToggleSwitch label="Sort By favorite" ToggleSwitchAction={onSortBy}/>
          </span>
          <input
            className={"inputText"}
            onChange={handleNameChange}
            placeholder={"Enter your friend's name"}
            type={"text"}
            value={searchText}
          />
          <div>
            <List
              items={filteredFriendList.length ? filteredFriendList : friendList}
              onDeleteFriend={deleteFriend}
              onFavoriteToggle={favoriteToggle}
            />
            {/* <Pagination items={friendList} onChangePage={onChangePage}/> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
