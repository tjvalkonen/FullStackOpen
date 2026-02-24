import { type Visibility, type Weather, type DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather>('sunny'); // Tyypitys tässä
  const [newVisibility, setNewVisibility] = useState<Visibility>('good'); // Tyypit
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getAllDiaries().then(data => {
      if (data) {
        setDiaries(data);
      }
    });
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd = { 
    date: newDate, 
    weather: newWeather, 
    visibility: newVisibility, 
    comment: newComment
  };

  createDiary(entryToAdd)
    .then(data => {
      setDiaries(diaries.concat(data));
      // Tyhjennä lomake onnistumisen jälkeen
    setNewDate('')
    setNewComment('')
    })
    .catch(error => {
      // Jos backend palauttaa virheen (esim. AxiosError)
      // console.error("Error saving:", error.response?.data || error.message);
      const message = error.response?.data;
      setError(message);
      setTimeout(() => setError(''), 5000);
    });
  };

  return (
    <div style={{margin: 25}}>
      <h3>Add new entry</h3>
       <form onSubmit={diaryCreation}>
      {/* Virheviestin näyttäminen */}
       {error && (
         <p style={{ color: 'red', marginBottom: '10px' }}>
           {error}
         </p>
       )}
        <strong>date</strong> <input type="date"
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)} 
        /> <br/>
     <table>
      <tbody>
     <tr>
<td width={80}>
        <strong>visibility </strong></td>
      
        <td width={80}>great
        <input type="radio" name="visibility" onChange={() => setNewVisibility('great')}/></td>
        <td width={80}>good
        <input type="radio" name="visibility" onChange={() => setNewVisibility('good')}/></td>
        <td width={80}>ok
        <input type="radio" name="visibility" onChange={() => setNewVisibility('ok')}/></td>
        <td width={80}>poor
        <input type="radio" name="visibility" onChange={() => setNewVisibility('poor')}/></td>
    </tr>
    <tr>
      <td width={80}><strong>weather </strong> </td>
      <td width={80}> sunny <input type="radio" name="weather" onChange={() => setNewWeather('sunny')}/></td>
      <td width={80}> rainy
        <input type="radio" name="weather" onChange={() => setNewWeather('rainy')}/></td>
      <td width={80}> cloudy
        <input type="radio" name="weather" onChange={() => setNewWeather('cloudy')}/></td>
      <td width={80}> stormy
        <input type="radio" name="weather" onChange={() => setNewWeather('stormy')}/></td>
      <td width={80}> windy
        <input type="radio" name="weather" onChange={() => setNewWeather('windy')}/></td>
    </tr>
    </tbody>
      </table>

       <strong>comment</strong> <input
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