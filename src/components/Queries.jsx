import React,{useState,useEffect} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import './Queries.css';
function Queries(){
    const navigate=useNavigate();
    const location=useLocation();
    const[message,setMessage]=useState('');
    const[questions,setQuestions]=useState([]);
    const[answers,setAnswers]=useState([]);
    const[role,setRole]=useState("");
    const[newAnswers,setNewAnswer]=useState({});
    const backend='https://travel-agency-backend-atxk.onrender.com';
    useEffect(()=>{
        async function fetchData(){
            const userId=location.state.userId;
            setRole(location.state.role);
            try{
                if(location.state.role==="admin"){
                    const result=await axios.get(`${backend}/api/users/getAllQueries`);
                    console.log(result.data);
                    setAnswers(result.data.answer);
                    setQuestions(result.data.question);
                }else{
                    const result=await axios.get(`${backend}/api/users/getUserQueries/${userId}`);
                    setAnswers(result.data.answer);
                    setQuestions(result.data.question);
                }
            }catch(err){
                console.error(err.message);
            }
        }
        fetchData();
    },[location.state]);
    function handleChange(e){
        setMessage(e.target.value);
    }
    async function formSubmit(e){
        e.preventDefault();
        try{
            const result=await axios.post(`${backend}/api/users/postQuestion/${localStorage.getItem('id')}`,{message});
            setQuestions((prev)=>[...prev,result.data[0]]);
            setMessage('');
            if(result.data.length>0){
                alert('Query is been sent. Come back here later to see the response.')
            }else{
                console.log('query is not posted');
                alert('Error posting the query');
            }
        }catch(err){
            console.error(err.message);
        }
    }
    function handleAnswerChange(questionId,value){
        setNewAnswer((prev)=>({
            ...prev,
            [questionId]:value
        }));
    }
    async function submitAnswer(questionId){
        try{
            const answer=newAnswers[questionId];
            if(!answer){
                alert('please enter value before processing further');
                return;
            }
            const result=await axios.post(`${backend}/api/users/postAnswer`,{
                question_id:questionId,
                answer,
            });
            if(result.status===201){
                alert('answer submitted successfully');
                setAnswers((prev)=>[...prev,{question_id:questionId,answer}]);
                setNewAnswer((prev)=>({...prev,[questionId]:''}));
            }
        }catch(err){
            console.error(err.message);
            alert('failed, try again');
        }
    }
    async function deleteQuestion(question_id){
        try{
            const result=await axios.delete(`${backend}/api/users/deleteQuestion/${question_id}`);
            if(result.data.length>0){
                alert('question deleted');
                setQuestions((prev)=>prev.filter((question)=>question.id!==question_id));           
            }else{
                alert('please try again');
            }
        }catch(err){
            console.error(err.message);
        }
    }
    return (
        <div className="container">
            {role==="user" && (
                <form onSubmit={formSubmit}>
                <textarea
                        value={message}
                        onChange={handleChange}
                        placeholder="Type your query here"
                        rows="5"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
            <h2>Queries</h2>
            {questions.length>0?(
                role==="user"?(
                    questions.map((question,index)=>{
                        return (
                            <div key={question.id} className="question-block">
                                <div className="question-inner-block">
                                    <h3>Question {index+1}: {question.question}</h3>
                                    <button onClick={()=>deleteQuestion(question.id)}><DeleteIcon /></button>
                                </div>
                                <div className="answer-block">
                                    {answers.filter(answer=>answer.question_id===question.id).map((answer,answerIndex)=>(
                                        <p key={answer.id}>{answerIndex+1}) {answer.answer}</p>
                                    ))}
                                </div>
                            </div>
                        )
                    })
                ):(
                    <div>
                        {questions.map((question,index)=>{
                        return (
                            <div key={question.id} className="question-block">
                                <h3>Question {index+1}: {question.question}</h3>
                                <div className="admin-answer-input">
                                    <textarea
                                        value={newAnswers[question.id] || ""}
                                        onChange={(e)=>handleAnswerChange(question.id,e.target.value)}
                                        placeholder="Enter your solution here"
                                        rows="3"
                                    />
                                    <button onClick={()=>submitAnswer(question.id)}>Submit Answer</button>
                                </div>
                                <div className="answer-block">
                                    {answers.filter(answer=>answer.question_id===question.id).map((answer,answerIndex)=>(
                                        <p key={answer.id}>{answerIndex+1}) {answer.answer}</p>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                )
            ):(
                <p>No Questions asked..</p>
            )}
            <button className="home" onClick={()=>navigate('/dashboard')}>Homepage</button>
        </div>
    )
}
export default Queries;