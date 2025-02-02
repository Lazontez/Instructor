import axios from 'axios';

const apiTask = {
  getTasks: async (userId , token) => {
    try {
      const response = await axios.get(`https://instructor-server.onrender.com/api/goals/g/${userId}` , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks from API:', error);
      throw error;
    }
  },
  addTask: async(task , token) =>{
    if(task){
      const response = await axios.post(`https://instructor-server.onrender.com/api/goals/c` , task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      return response.data;
    }else{
     return `Task: ${task}`
    }
  },
  removeTask: async (taskId , token) => {
    try {
      await axios.delete(`https://instructor-server.onrender.com/api/goals/r/${taskId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }}).then(res=>{
            return res.data
        });  
    } catch (error) {
      console.error('Error removing task:', error);
      throw error;
    }
  }, 
  editTask: async(taskId, token, updatedDetails)=>{
    try {
      await axios.put(`https://instructor-server.onrender.com/api/goals/u/${taskId}`,updatedDetails,{
        headers: {
          Authorization: `Bearer ${token}`,
        }},
        {}
      ).then(res=>{
            return res.data
        });  
    } catch (error) {
      console.error('Error editing task:', updatedDetails);
      throw error;
    }
  }
};

export default apiTask;
