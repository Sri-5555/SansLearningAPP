import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Subscription, interval } from 'rxjs';
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

  totalTime: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timerSubscription: Subscription;
  questionData: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.showResults = false;
    this.route.paramMap.subscribe(params => {
      this.questionData = history.state.testData;
      this.questions = this.questionData.questions;
      this.currentQuestion = this.questions[0];
      this.totalTime = this.convertTimeStringToSeconds(this.questionData.time);
      if(this.questionData.category == 'achievement-test'){
        this.startTimer();
      }
    });
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.totalTime--;
      this.minutes = Math.floor(this.totalTime / 60);
      this.seconds = this.totalTime % 60;
      console.log("time", this.minutes, this.seconds);
      if (this.totalTime <= 0) {
        this.timerSubscription.unsubscribe();
        this.submitAnswer();
      }
    });
  }

  convertTimeStringToSeconds(timeString) {
    const timeParts = timeString.split(' ');
    let totalSeconds = 0;
    const value = parseInt(timeParts[0]);
    const unit = timeParts[1];
    if (unit === 'm') {
      totalSeconds = value * 60; // Convert minutes to seconds
    } else if (unit === 'h') {
      totalSeconds = value * 3600; // Convert hours to seconds
    }
    return totalSeconds;
  }

  submitAnswer() {
    if (this.selectedChoice != '') {
      const result = {
        question: this.currentQuestion.question,
        selectedChoice: this.selectedChoice,
        correctChoice: this.currentQuestion.correctChoice
      };
      // Update the answer if it already exists, otherwise push it to the results array
      const existingResultIndex = this.results.findIndex(r => r.question === this.currentQuestion.question);
      if (existingResultIndex > -1) {
        this.results[existingResultIndex] = result;
      } else {
        this.results.push(result);
      }
      this.selectedChoice = '';
      this.currentQuestionIndex++;
  
      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        // Check if there's already an answer for this question
        const existingAnswer = this.results.find(r => r.question === this.currentQuestion.question);
        if (existingAnswer) {
          this.selectedChoice = existingAnswer.selectedChoice;
        }
      } else {
        this.showResults = true;
        this.timerSubscription.unsubscribe();
        this.scrollToTop();
      }
    }
  }

  goToPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      const existingAnswer = this.results.find(r => r.question === this.currentQuestion.question);
      if (existingAnswer) {
        this.selectedChoice = existingAnswer.selectedChoice;
      } else {
        this.selectedChoice = '';
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

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ionViewWillLeave() {
    this.stopTimer();
  }
}

