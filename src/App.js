//import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useMemo }  from 'react';

import List from './Components/List/List';
import Pagination from './Components/Pagination/Pagination';
import ToggleSwitch from './Components/ToggleButton/ToggleButton';


import defaultFriendList from "./MOCK_DATA.json";

function App() {
  const [searchText, setSearchText] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [filteredFriendList, setFilteredFriendList] = useState([]);
  const [sortByfav, setSortByfav] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const PageSize=4;
  useEffect(()=>{
    setFriendList(defaultFriendList)
  },[])

  useEffect(()=>{
    if(!sortByfav) {
      setFriendList([...defaultFriendList])
    } else{
      const sortedData = friendList.sort(function(x, y) {
        let a1=x.isFav ? 0 : 1
        let b1=y.isFav? 0 : 1
        return a1-b1
      });
      setFriendList([...sortedData])
    }
  },[sortByfav])

  // useEffect(()=>{
  //   console.log('currentPage: ', currentPage);
  // },[currentPage])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return (filteredFriendList.length ? filteredFriendList : friendList).slice(firstPageIndex, lastPageIndex);
  }, [currentPage, friendList,filteredFriendList]);


  const handleNameChange = (event)=> {
    let enteredValue = event.target.value;
    setSearchText(enteredValue)

    if(enteredValue.trim().length === 0){
      console.log("I am here")
      setFriendList(friendList)
      setFilteredFriendList([])
    } else {
       //filter Item
      let filteredName = friendList.filter((item)=>{
        //console.log('item.name: ', item.name);
        if(item.name.toLowerCase().includes(enteredValue.toLowerCase())){
          return item;
        }
      });

      setFilteredFriendList(filteredName)
    }

  };

  const deleteFriend =(id)=>{
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
    const updatedData = makeFavorite(friendList, id)
    setFriendList(updatedData)
    filteredFriendList.length && setFilteredFriendList(makeFavorite(filteredFriendList, id))
  }

  const onSortBy  = (event)=>event.target.checked ?  setSortByfav(true) : setSortByfav(false);


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
              //items={filteredFriendList.length ? filteredFriendList : friendList}
              items={currentTableData}
              onDeleteFriend={deleteFriend}
              onFavoriteToggle={favoriteToggle}
            />
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={filteredFriendList.length || friendList.length}
              pageSize={4}
              onPageChange={page => setCurrentPage(page)}
          />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
