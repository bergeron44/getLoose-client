import axios from 'axios'

export const addQuestion = (newQuestion) => async dispatch => {
    const question = await axios.post(`https://rightordrink-server.onrender.com/api/question/create`,newQuestion)
    console.log(question.data)
    alert("question : "+JSON.stringify(question.data)+ " add seccesfuly")
    
}
export const addCategory = (newCatgory) => async dispatch => {
    const category = await axios.post(`https://rightordrink-server.onrender.com/api/category/create`,newCatgory)
    console.log(category.data)
    
}
export const editCategory = (catgoryId,num) => async dispatch => {
    const category = await axios.post(`https://rightordrink-server.onrender.com/api/category/${catgoryId}/edit`,
    {
    categoryNumOfQuestion:num 
    }
    )
    console.log(category.data)
    
}
