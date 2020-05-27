import React from 'react'

/* context file for TipsDeck Client */
export default React.createContext({
  categories: [],
  tips: [], 
  deleteTip: () => {}, 
  addTip: () => {},
  editTip: () => {}, 
})