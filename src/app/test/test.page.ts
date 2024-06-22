import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  
  questions: any[] = [];
  currentQuestionIndex = 0;
  currentQuestion = this.questions[0];
  selectedChoice: string = '';
  showResults = false;
  results: any[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.showResults = false;
    this.route.paramMap.subscribe(params => {
      const questionData = history.state.testData;
      this.questions = questionData.questions;
      this.currentQuestion = this.questions[0];
    });
  }

  submitAnswer() {
    if (this.selectedChoice != '') {
      const result = {
        question: this.currentQuestion.question,
        selectedChoice: this.selectedChoice,
        correctChoice: this.currentQuestion.correctChoice
      };
      this.results.push(result);
      this.selectedChoice = '';
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      } else {
        this.showResults = true;
        this.scrollToTop();
      }
    }
  }

  buttonText() {
    return this.currentQuestionIndex + 1 == this.questions.length ? 'Submit' : 'Next Question';
  }

  optionSelected(option) {
    this.selectedChoice = option;
  }

  getCorrectAnswerNumber() {
    let correctAnsArr = 0;
    this.results.forEach(question => {
      if (question.selectedChoice == question.correctChoice) {
        correctAnsArr++;
      }
    });
    return correctAnsArr;
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}

