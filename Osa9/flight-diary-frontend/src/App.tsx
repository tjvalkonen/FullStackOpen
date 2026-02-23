import { Visibility, Weather, type DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })  
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({ 
      date: newDate, 
      weather: Weather.Cloudy, 
      visibility: Visibility.Good, 
      comment: "newDiaryEntry" 
    }).then(data => {
      setDiaries(diaries.concat(data))
    })
    
    setNewDate('')
    setNewVisibility('')
    setNewWeather('')
    setNewComment('')
  };

  return (
    <div style={{margin: 25}}>
       <form onSubmit={diaryCreation}>
        date <input
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)} 
        /> <br/>
        visibility <input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)} 
        /><br/>
        weather <input
          value={newWeather}
          onChange={(event) => setNewWeather(event.target.value)} 
        /><br/>
       comment <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)} 
        /><br/>
        <button type='submit'>add</button>
      </form>
    <div>
    <h3>Diary entries</h3>
        {diaries.map(entry =>
          <div key={entry.id}>
          <strong>{entry.date}</strong><br/><br/>
          visibility: {entry.visibility}<br/>
          weather: {entry.weather}<br/><br/></div>
        )}
    </div>
    </div>
  )
}

export default App
