import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";

import { useMutation } from "@apollo/react-hooks";
import { SEND_EMAIL } from "../queries/Query";
import {
  displayErrorMessageForGraphQL,
  validateEmail,
} from "../helpers/helper";

import ReCAPTCHA from "react-google-recaptcha";

// core components
import LandingNavbar from "components/Navbars/LandingNavbar.js";

const Landing = () => {
  const [nameFocused, setNameFocused] = React.useState(false);
  const [emailFocused, setEmailFocused] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [reCaptcha, setReCaptcha] = React.useState(null);

  const history = useHistory();

  const [resultMessage, setResultMessage] = React.useState(null);
  const recaptchaRef = React.createRef();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    //ref.scrollTop = 0;
  }, [document]);

  const [sendEmail, { loading }] = useMutation(SEND_EMAIL, {
    onCompleted(data) {
      setResultMessage(data.sendEmail.message);
    },
    onError(error) {
      setResultMessage(displayErrorMessageForGraphQL(error.message));
    },
  });

  function reCaptchaOnChange(value) {
    setReCaptcha(value);
  }

  function reCaptchaOnError() {
    setReCaptcha(null);
  }

  function handleClick(e) {
    e.preventDefault();
    if (validateForm()) {
      sendEmail({
        variables: {
          name: name,
          email: email,
          message: message,
          recaptchaValue: reCaptcha,
        },
      });
      setName("");
      setEmail("");
      setMessage("");
      setReCaptcha(null);
      recaptchaRef.current.reset();
    }
  }

  function setInvalidEmailField(email) {
    if (email === "") {
      return false;
    }
    if (validateEmail(email)) {
      return false;
    }
    return true;
  }

  function validateForm() {
    if (
      name === "" ||
      email === "" ||
      message === "" ||
      !validateEmail(email)
    ) {
      return false;
    }
    return true;
  }

  return (
    <>
      <LandingNavbar />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="6">
                    <h1 className="display-3 text-white">
                      교회를 위한 맞춤 앱
                    </h1>
                    <p className="lead text-white">
                      아직도 단톡방으로 성도들에게 교회소식을 전하나요? <br />
                      아직도 온라인 헌금을 받지 못하시나요? <br />
                      Church App이 모든것을 깔끔히 해결해 드립니다.
                    </p>
                    <br />
                    <br />
                    <div className="btn-wrapper">
                      <Button
                        className="btn-icon mb-3 mb-sm-0"
                        color="info"
                        href="#contact"
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="fa fa-rocket" />
                        </span>
                        <span className="btn-inner--text">데모앱 신청하기</span>
                      </Button>
                    </div>
                    <p className="lead text-white">
                      <mark>안드로이드 앱</mark>과 <mark>아이폰 앱</mark>을
                      동시에!
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          {/* 1st Hero Variation */}
        </div>
        <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                          <i className="ni ni-button-play" />
                        </div>
                        <h6 className="text-primary text-uppercase">
                          Church App에서 바로 설교를 보자!
                        </h6>
                        <p className="description mt-3">
                          Youtube에 올리신 설교를 Church App 내에서 최신설교와
                          재생목록별로 바로 감상할 수 있습니다.
                        </p>
                        <div>
                          <Badge color="primary" pill className="mr-1">
                            Youtube
                          </Badge>
                          <Badge color="primary" pill className="mr-1">
                            Sermon
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                          <i className="ni ni-credit-card" />
                        </div>
                        <h6 className="text-success text-uppercase">
                          간편한 온라인 헌금 시스템!
                        </h6>
                        <p className="description mt-3">
                          성도들이 크레딧 카드만 있으면 별도의 가입없이 Church
                          App 에서 바로 헌금을 할 수 있습니다.
                        </p>
                        <div>
                          <Badge color="success" pill className="mr-1">
                            Offering
                          </Badge>
                          <Badge color="success" pill className="mr-1">
                            Secure
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                          <i className="ni ni-notification-70" />
                        </div>
                        <h6 className="text-warning text-uppercase">
                          빠르고 정확한 알림 시스템!
                        </h6>
                        <p className="description mt-3">
                          더 이상 중요한 소식을 단톡방이나 전체 메세지로
                          보내시지 않아도 됩니다. Church App을 설치하면 이제
                          핸드폰으로 알림이 바로바로 전달 됩니다.
                        </p>
                        <div>
                          <Badge color="warning" pill className="mr-1">
                            Push notification
                          </Badge>
                          <Badge color="warning" pill className="mr-1">
                            News
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/theme/promo-1.png")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                    <i className="ni ni-settings" />
                  </div>
                  <h3>Dashboard System</h3>
                  <p>
                    Church App에서는 관리자 시스템을 제공하고 있습니다. 앱
                    관리자가 원하는데로 앱의 컨텐츠를 변경하실 수 있습니다.
                    변경하신 내용은 앱에 적용되어서 성도분들이 새로운 내용을
                    바로 보실수 있습니다.
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-ruler-pencil" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">기본적인 교회 정보 수정하기</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-calendar-grid-58" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">교회 소식 추가하기</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-notification-70" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            성도들에게 알림 메세지 보내기
                          </h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pb-0 bg-gradient-warning">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-lg-2 ml-lg-auto" md="6">
                <div className="position-relative pl-md-5">
                  <img
                    alt="..."
                    className="img-center img-fluid"
                    src={require("assets/img/ill/ill-2.svg")}
                  />
                </div>
              </Col>
              <Col className="order-lg-1" lg="6">
                <div className="d-flex px-3">
                  <div>
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                      <i className="ni ni-building text-primary" />
                    </div>
                  </div>
                  <div className="pl-4">
                    <h4 className="display-3 text-white">How It works</h4>
                    <p className="text-white">
                      Church App을 어떻게 각 교회에서 사용할 수 있을까요? 간단한
                      진행과정을 소개해 드리겠습니다.
                    </p>
                  </div>
                </div>
                <Card className="shadow shadow-lg--hover mt-5">
                  <CardBody>
                    <div className="d-flex px-3">
                      <div>
                        <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                          <i className="ni ni-send" />
                        </div>
                      </div>
                      <div className="pl-4">
                        <h5 className="title text-success">1. 앱 신청하기</h5>
                        <p>
                          Sign up 버튼을 누르셔서 가입을 하셔서 기본적인 교회
                          정보를 직접 입력합니다. 그후에 앱 신청하기 버튼을
                          누릅니다.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="shadow shadow-lg--hover mt-5">
                  <CardBody>
                    <div className="d-flex px-3">
                      <div>
                        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                          <i className="ni ni-atom" />
                        </div>
                      </div>
                      <div className="pl-4">
                        <h5 className="title text-warning">2. 앱 셋업</h5>
                        <p>
                          팀내에 개발자가 각 교회에 맞게 여러가지 앱 환경설정을
                          합니다.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="shadow shadow-lg--hover mt-5">
                  <CardBody>
                    <div className="d-flex px-3">
                      <div>
                        <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                          <i className="ni ni-active-40" />
                        </div>
                      </div>
                      <div className="pl-4">
                        <h5 className="title text-primary">3. 데모앱 확인</h5>
                        <p>
                          개발자가 준비된 앱을 볼수 있게 이메일로 링크를
                          보내드립니다.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="shadow shadow-lg--hover mt-5">
                  <CardBody>
                    <div className="d-flex px-3">
                      <div>
                        <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                          <i className="ni ni-planet" />
                        </div>
                      </div>
                      <div className="pl-4">
                        <h5 className="title text-info">4. 앱 출시</h5>
                        <p>
                          앱 테스트를 마친후 변경 사항이 없으시면 이제 개발자가
                          앱 출시를 위한 준비과정을 거친후 Google Play Store와
                          Apple App Store에 각자의 교회 이름으로 앱을 출시
                          하게됩니다.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section section-lg bg-gradient-default">
          <Container className="pt-lg pb-300">
            <Row className="text-center justify-content-center">
              <Col lg="10">
                <h2 className="display-3 text-white">지금 신청하세요!</h2>
                <p className="lead text-white">
                  현재 베타 서비스를 진행중에 있습니다. 최대 50%까지 할인된
                  가격으로 <mark>안드로이드 앱</mark>과<mark>아이폰 앱</mark>을
                  가질 수 있습니다.
                </p>
              </Col>
            </Row>
            <Row className="row-grid mt-5">
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-settings text-primary" />
                </div>
                <h5 className="text-white mt-3">지속적인 성능 업그레이드</h5>
                <p className="text-white mt-3">
                  한번 출시하면 다시 업그레이드 하기가 까다롭고 비용도 많이 드는
                  일반앱에 비해 Church App은 꾸준히 성능 최적화를 합니다.
                </p>
              </Col>
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-ruler-pencil text-primary" />
                </div>
                <h5 className="text-white mt-3">지속적인 기능 추가</h5>
                <p className="text-white mt-3">
                  Church App은 지속적으로 새로운 기능을 추가할 계획이 있습니다.
                  추후 발표할 예정입니다.
                </p>
              </Col>
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-diamond text-primary" />
                </div>
                <h5 className="text-white mt-3">프리미엄 서비스</h5>
                <p className="text-white mt-3">
                  좀 더 개성있는 교회앱이 필요하신 분들을 위해서 맞춤형 프리미엄
                  서비스도 계획하고 있습니다.
                </p>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section
          id="contact"
          className="section section-lg pt-lg-0 section-contact-us"
        >
          <Container>
            <Row className="justify-content-center mt--300">
              <Col lg="8">
                <Card className="bg-gradient-secondary shadow">
                  <CardBody className="p-lg-5">
                    <h4 className="mb-1">질문이 있으신가요?</h4>
                    <p className="mt-0">
                      데모앱을 원하시거나 질문이 있으시면 메세지를 보내주세요.
                    </p>
                    <p className="mt-0 text-danger">{resultMessage}</p>
                    <form>
                      <FormGroup
                        className={classnames("mt-5", {
                          focused: nameFocused,
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="이름"
                            type="text"
                            value={name}
                            onFocus={(e) => setNameFocused(true)}
                            onBlur={(e) => setNameFocused(false)}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: emailFocused,
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="이메일 주소"
                            type="email"
                            invalid={setInvalidEmailField(email)}
                            value={email}
                            onFocus={(e) => setEmailFocused(true)}
                            onBlur={(e) => setEmailFocused(false)}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          <FormFeedback>
                            올바른 이메일 형식을 입력하세요
                          </FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          value={message}
                          placeholder="메세지를 입력하세요..."
                          rows="4"
                          type="textarea"
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <div>
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey="6LeBr_8UAAAAAMfHP4idaKRVRHy1W-pYLcymozKM"
                          onChange={reCaptchaOnChange}
                          onExpired={reCaptchaOnError}
                          onError={reCaptchaOnError}
                        />
                      </div>
                      <br />
                      <br />
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="submit"
                          disabled={!validateForm()}
                          onClick={(e) => handleClick(e)}
                        >
                          메세지 보내기
                        </Button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Landing;
