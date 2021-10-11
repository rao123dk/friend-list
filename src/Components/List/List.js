
//import { useState, useEffect, useCallback }  from 'react';
import Button from '../Button/Button';

function List({items, onDeleteFriend, onFavoriteToggle}) {
//   const [searchText, setSearchText] = useState('');
//   const [friendList, setFriendList] = useState(defaultFriendList);
//   const handleNameChange = (event)=> {
//     console.log('event: ', event.target.value);
//     setSearchText(event.target.value)
//   }
  return (
    <>
    {
        items && items.map(( { name, id, isFav})=>{
            return (
                <div  key={id} className="listRow">
                    <div>
                        <div>{name}</div>
                        <div style={{ opacity: '0.4'}}>Is your friend</div>
                    </div>
                    <div>
                    {/* <i class="fas fa-trash-alt"></i> */}
                        <Button className={'delete'} onClick={()=>onDeleteFriend(id)}><i className="fa fa-trash-o" ></i></Button>
                        <Button className={'favorite'} onClick={()=>onFavoriteToggle(id)}><span className={`fa fa-star ${isFav ? 'checked' : ''}`}></span></Button>
                    </div>

                </div>

            )
        })
    }
    </>
  );
}

export default List;
