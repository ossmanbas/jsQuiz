//Constructor Fonksiyonumuz hazırlayalım
function Question(text,choices,answer)
{
    this.text=text;
    this.choices = choices;
    this.answer = answer;
}

//Prototype imizi Oluşturalım
Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

//Quiz Constructor
function Quiz(sorular){
 this.sorular=sorular;
 this.score = 0;
 this.soruIndex=0;
}

//Quiz Prototype oluşturalım (Soru Sırası İçin)
Quiz.prototype.getSoru = function(){
    return this.sorular[this.soruIndex];
}

//Sorular bitti mi bitmedi mi kontrol eden Function 
Quiz.prototype.isFinish = function(){
    return this.sorular.length === this.soruIndex;
}

//Quiz Guess (Cevaplar ve skor için)
Quiz.prototype.tahmin = function(answer){
let cevap = this.getSoru();
if(cevap.checkAnswer(answer)){
this.score++;
}
this.soruIndex++;
}

//Sorularımızı yazalım
let q1 = new Question("What is the best programming language ?",["C#","JavaScript","Flutter","Python"],"C#");
let q2 = new Question("What is  mobile programming language ?",["C#","JavaScript","Flutter","Python"],"Flutter");
let q3 = new Question("What is   database programming language ?",["C#","SQL","Flutter","Python"],"SQL");

let sorular =[q1,q2,q3];


//Start Quiz
let quiz = new Quiz(sorular);
loadQuestion();

function loadQuestion(){
    if(quiz.isFinish())
    {
        showScore();
    }
    else {
        let soru = quiz.getSoru();
        let secenekler = soru.choices;
        document.querySelector("#soru").textContent = soru.text;

        for(let i = 0;i<secenekler.length;i++)
        {
           let element = document.querySelector('#choice'+i);
           element.innerHTML = secenekler[i];
        guess("btn"+[i],secenekler[i])
        }
        showProgress();
    }
}


function guess(id,guess){
    let butn = document.getElementById(id);
        butn.onclick = function(){
            quiz.tahmin(guess);
            
            loadQuestion();
    }
    
}

function showScore(){
    let html =`<h4>Score</h4><h2>${quiz.score}</h2>`
    document.querySelector(".card-body").innerHTML =html;
    
}
function showProgress(){
    let kacincisoru = quiz.soruIndex;
    let toplamsoru = quiz.sorular.length;
    let html =`<p>Question ${kacincisoru+1} of
             ${toplamsoru}    
    </p>`
    document.querySelector("#progress").innerHTML = html;

}
