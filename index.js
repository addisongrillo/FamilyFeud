const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

let answers = [
  { id: 0, answerText: '', number: '' },
  { id: 1, answerText: '', number: '' },
  { id: 2, answerText: '', number: '' },
  { id: 3, answerText: '', number: '' },
]
let wrongCount = 0
app.get('/answers', (request, response) => {
  response.json(answers)
})
app.get('/wrongCount', (request, response) => {
  response.json(wrongCount)
})

app.post('/wrongCount', (request, response) => {
  wrongCount < 3 && wrongCount++
  response.json(wrongCount)
})
app.delete('/wrongCount', (request, response) => {
  wrongCount = 0
  response.json(wrongCount)
})

app.post('/answers', (request, response) => {
  const answer = request.body
  if (answer.answerText) {
    answers[answer.id] = answer
    response.json(answers)
  } else {
    response.status(422).json({ error: "answerText missing" })
  }
})

app.delete('/answers/:id', (request, response) => {
  const answerId = Number(request.params.id)
  answers[answerId] = { id: answerId, answerText: '', number: '' }
  response.json(answers)
})

app.delete('/answersAll', (request, response) => {
  answers = [
    { id: 0, answerText: '', number: '' },
    { id: 1, answerText: '', number: '' },
    { id: 2, answerText: '', number: '' },
    { id: 3, answerText: '', number: '' },
  ]
  response.json(answers)
})

app.listen(process.env.PORT || 3000)

console.log("APP is working")
