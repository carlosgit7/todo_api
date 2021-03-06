/* eslint-disable prettier/prettier */

import { nanoid } from 'nanoid'
import Joi from 'joi'

import logger from './logger'

const todos = []

const todoSchema = Joi.object({
    text: Joi.string().min(5).required(),
    completed: Joi.boolean().required(),
  })

const baseTodo = {
  id: nanoid(),
  text: 'Test todo item',
  completed: false,
}

todos.push(baseTodo)

export const getTodos = (completed = null) => {
    if (completed === null) {
        logger.log.success('Getting all todos')
        return todos
      }
    
      logger.log.success('Getting by completion todos')
    
      // eslint-disable-next-line no-unneeded-ternary
      const isCompleted = completed === 'true' ? true : false

      return todos.filter((todo) => todo.completed === isCompleted)
}

export const getTodo = (id) => {
    logger.log.info(`Getting todo with id: ${id}`)
    return todos.find((todo) => todo.id === id)

  }

export const addTodo = (todo) => {
    logger.log.info(`Validating ${todo} to add`)
    const { error} = todoSchema.validate(todo)

    if (error) {
      logger.log.error(new Error(`Validation error: ${error.message}`))
      return { error }
    }

    logger.log.success(`Validated: ${todo}`)
    const newTodo = {id: nanoid(), ...todo}
    todos.push(newTodo)
    return {newTodo}
}

export const updateTodo = async (id, todo) => {
    logger.log.info(`Validating ${todo} for update`)
    const { error } = todoSchema.validate(todo)
  
    if (error) {
      logger.log.error(new Error(`Validation error: ${error.message}`))
      return { error }
    }
    
    logger.log.success(`Validated: ${todo}`)
  
    const todoIndex = todos.findIndex((t) => t.id === id)
    todos[todoIndex] = {id, ...todo}  
    const updatedTodo = todos[todoIndex]
    return { updatedTodo } 
  }


