import React, { Component } from "react";
import DoctorSidebar from "../sidebar";
import { IMG01, IMG02, IMG03, IMG04, IMG05, IMG06, IMG07, IMG08 } from "./img";

class Review extends Component {
  render() {
    return (
      <>
        <div class="breadcrumb-bar">
          <div class="container-fluid">
            <div class="row align-items-center">
              <div class="col-md-12 col-12">
                <nav aria-label="breadcrumb" class="page-breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="/doctor">Doctor</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Reviews
                    </li>
                  </ol>
                </nav>
                <h2 class="breadcrumb-title">Reviews</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <DoctorSidebar />
              </div>
              <div class="col-md-7 col-lg-8 col-xl-9">
                <div class="doc-review review-listing">
                  <ul class="comments-list">
                    <li>
                      <div class="comment">
                        <img
                          class="avatar rounded-circle"
                          alt="User"
                          src={IMG01}
                        />
                        <div class="comment-body">
                          <div class="meta-data">
                            <span class="comment-author">Richard Wilson</span>
                            <span class="comment-date">
                              Reviewed 2 Days ago
                            </span>
                            <div class="review-count rating">
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star"></i>
                            </div>
                          </div>
                          <p class="recommended">
                            <i class="far fa-thumbs-up"></i> I recommend the
                            doctor
                          </p>
                          <p class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation. Curabitur non nulla sit amet
                            nisl tempus
                          </p>
                          <div class="comment-reply">
                            <a class="comment-btn" href="#0">
                              <i class="fas fa-reply"></i> Reply
                            </a>
                            <p class="recommend-btn">
                              <span>Recommend?</span>
                              <a href="#0" class="like-btn">
                                <i class="far fa-thumbs-up"></i> Yes
                              </a>
                              <a href="#0" class="dislike-btn">
                                <i class="far fa-thumbs-down"></i> No
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <ul class="comments-reply">
                        <li>
                          <div class="comment">
                            <img
                              class="avatar rounded-circle"
                              alt="User"
                              src={IMG02}
                            />
                            <div class="comment-body">
                              <div class="meta-data">
                                <span class="comment-author">
                                  Dr. Darren Elder
                                </span>
                                <span class="comment-date">
                                  Reviewed 3 Days ago
                                </span>
                              </div>
                              <p class="comment-content">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam. Curabitur non nulla sit
                                amet nisl tempus
                              </p>
                              <div class="comment-reply">
                                <a class="comment-btn" href="#0">
                                  <i class="fas fa-reply"></i> Reply
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <div class="comment">
                        <img
                          class="avatar rounded-circle"
                          alt="User"
                          src={IMG03}
                        />
                        <div class="comment-body">
                          <div class="meta-data">
                            <span class="comment-author">Travis Trimble</span>
                            <span class="comment-date">
                              Reviewed 4 Days ago
                            </span>
                            <div class="review-count rating">
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                            </div>
                          </div>
                          <p class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation. Curabitur non nulla sit amet
                            nisl tempus
                          </p>
                          <div class="comment-reply">
                            <a class="comment-btn" href="#0">
                              <i class="fas fa-reply"></i> Reply
                            </a>
                            <p class="recommend-btn">
                              <span>Recommend?</span>
                              <a href="#0" class="like-btn">
                                <i class="far fa-thumbs-up"></i> Yes
                              </a>
                              <a href="#0" class="dislike-btn">
                                <i class="far fa-thumbs-down"></i> No
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="comment">
                        <img
                          class="avatar rounded-circle"
                          alt="User"
                          src={IMG04}
                        />
                        <div class="comment-body">
                          <div class="meta-data">
                            <span class="comment-author">Carl Kelly</span>
                            <span class="comment-date">
                              Reviewed 5 Days ago
                            </span>
                            <div class="review-count rating">
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                            </div>
                          </div>
                          <p class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation. Curabitur non nulla sit amet
                            nisl tempus
                          </p>
                          <div class="comment-reply">
                            <a class="comment-btn" href="#0">
                              <i class="fas fa-reply"></i> Reply
                            </a>
                            <p class="recommend-btn">
                              <span>Recommend?</span>
                              <a href="#0" class="like-btn">
                                <i class="far fa-thumbs-up"></i> Yes
                              </a>
                              <a href="#0" class="dislike-btn">
                                <i class="far fa-thumbs-down"></i> No
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="comment">
                        <img
                          class="avatar rounded-circle"
                          alt="User"
                          src={IMG05}
                        />
                        <div class="comment-body">
                          <div class="meta-data">
                            <span class="comment-author">Michelle Fairfax</span>
                            <span class="comment-date">
                              Reviewed 6 Days ago
                            </span>
                            <div class="review-count rating">
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                            </div>
                          </div>
                          <p class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation. Curabitur non nulla sit amet
                            nisl tempus
                          </p>
                          <div class="comment-reply">
                            <a class="comment-btn" href="#0">
                              <i class="fas fa-reply"></i> Reply
                            </a>
                            <p class="recommend-btn">
                              <span>Recommend?</span>
                              <a href="#0" class="like-btn">
                                <i class="far fa-thumbs-up"></i> Yes
                              </a>
                              <a href="#0" class="dislike-btn">
                                <i class="far fa-thumbs-down"></i> No
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="comment">
                        <img
                          class="avatar rounded-circle"
                          alt="User"
                          src={IMG06}
                        />
                        <div class="comment-body">
                          <div class="meta-data">
                            <span class="comment-author">Gina Moore</span>
                            <span class="comment-date">
                              Reviewed 1 Week ago
                            </span>
                            <div class="review-count rating">
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                            </div>
                          </div>
                          <p class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation. Curabitur non nulla sit amet
                            nisl tempus
                          </p>
                          <div class="comment-reply">
                            <a class="comment-btn" href="#0">
                              <i class="fas fa-reply"></i> Reply
                            </a>
                            <p class="recommend-btn">
                              <span>Recommend?</span>
                              <a href="#0" class="like-btn">
                                <i class="far fa-thumbs-up"></i> Yes
                              </a>
                              <a href="#0" class="dislike-btn">
                                <i class="far fa-thumbs-down"></i> No
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="comment">
                        <img
                          class="avatar rounded-circle"
                          alt="User"
                          src={IMG07}
                        />
                        <div class="comment-body">
                          <div class="meta-data">
                            <span class="comment-author">Walter Roberson</span>
                            <span class="comment-date">
                              Reviewed 1 Week ago
                            </span>
                            <div class="review-count rating">
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                            </div>
                          </div>
                          <p class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation. Curabitur non nulla sit amet
                            nisl tempus
                          </p>
                          <div class="comment-reply">
                            <a class="comment-btn" href="#0">
                              <i class="fas fa-reply"></i> Reply
                            </a>
                            <p class="recommend-btn">
                              <span>Recommend?</span>
                              <a href="#0" class="like-btn">
                                <i class="far fa-thumbs-up"></i> Yes
                              </a>
                              <a href="#0" class="dislike-btn">
                                <i class="far fa-thumbs-down"></i> No
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="comment">
                        <img
                          class="avatar rounded-circle"
                          alt="User"
                          src={IMG08}
                        />
                        <div class="comment-body">
                          <div class="meta-data">
                            <span class="comment-author">Daniel Griffing</span>
                            <span class="comment-date">
                              Reviewed on 1 Nov 2019
                            </span>
                            <div class="review-count rating">
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                              <i class="fas fa-star filled"></i>
                            </div>
                          </div>
                          <p class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation. Curabitur non nulla sit amet
                            nisl tempus
                          </p>
                          <div class="comment-reply">
                            <a class="comment-btn" href="#0">
                              <i class="fas fa-reply"></i> Reply
                            </a>
                            <p class="recommend-btn">
                              <span>Recommend?</span>
                              <a href="#0" class="like-btn">
                                <i class="far fa-thumbs-up"></i> Yes
                              </a>
                              <a href="#0" class="dislike-btn">
                                <i class="far fa-thumbs-down"></i> No
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Review;
