import axios from 'axios';

const apiTask = {
  getTasks: async (userId , token) => {
    try {
        console.log("response")
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
      console.log('Task Details Not Found')
    }
  }

//   removeTask: async (taskId) => {
//     try {
//       await axios.delete(`/api/tasks/${taskId}`);  
//     } catch (error) {
//       console.error('Error removing task:', error);
//       throw error;
//     }
//   },
};

export default apiTask;
