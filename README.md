![thumbnail](https://github.com/user-attachments/assets/cd7e8ab6-4d94-465d-8817-6ecd18f61125)

<div align="center">
    <a href="https://liboo.kr" target="_blank">
      <img src="https://github.com/user-attachments/assets/ad322787-ad07-4405-b526-112c882e66ab" width="20%" />
    </a>
  <h3> 컨퍼런스를 더 가까이, LiBoo 에서 라이브로 🚀 </h3>
</div>
<div align="center">
  <p align=center>
    <a href="https://gominzip.notion.site/TEAM-127673f3719e803faf63c70322560d3b?pvs=4"> Notion </a> &nbsp; ｜ &nbsp; 
    <a href="https://www.figma.com/design/op5Ui6oZ4Zx2D8VUgWOKM0/LiBoo-%F0%9F%9A%80?node-id=1-2&node-type=canvas&t=zcYYT1qCtckcUdcs-0"> Figma </a> &nbsp; ｜ &nbsp;
    <a href="https://github.com/boostcampwm-2024/web22-LiBoo/wiki"> Wiki </a> &nbsp; ｜ &nbsp;
    <a href="https://github.com/orgs/boostcampwm-2024/projects/17"> BackLog </a> &nbsp; ｜ &nbsp;
    <a href="https://blog.liboo.kr"> Blog </a>
  </p>
</div>

<br/>

> ### 목차
> [1. 💻 데모 및 배포 링크](#-데모-및-배포-링크) <br>
> [2. 🎯 기획 배경](#-기획-배경) <br>
> [3. 📺 핵심 기능](#-핵심-기능) <br>
> [4. ⚙️ 서비스 아키텍처](#%EF%B8%8F-서비스-아키텍처) <br>
> &nbsp;&nbsp;&nbsp;&nbsp;[4.1. 호스트](#-호스트) <br>
> &nbsp;&nbsp;&nbsp;&nbsp;[4.2. 클라이언트](#-클라이언트) <br>
> &nbsp;&nbsp;&nbsp;&nbsp;[4.3. CI/CD](#-cicd) <br>
> [5. 📝 핵심 기술 정리](#-핵심-기술-정리) <br>
> &nbsp;&nbsp;&nbsp;&nbsp;[5.1. 전체](#전체) <br>
> &nbsp;&nbsp;&nbsp;&nbsp;[5.2. 프론트엔드의 기술적 도전](#프론트엔드의-기술적-도전) <br>
> &nbsp;&nbsp;&nbsp;&nbsp;[5.3. 백엔드의 기술적 도전](#백엔드의-기술적-도전) <br>
> [6. 🛠️ 기술 스택](#%EF%B8%8F-기술-스택) <br>
> [7. 👊 팀 소개](#team-정권지르기-) <br>

<br/>

# 💻 데모 및 배포 링크

- **서비스 링크**: [https://liboo.kr](https://liboo.kr/)

<br/>


# 🎯 기획 배경

네이버 DAN, 토스 Slash, 카카오 If, 인프콘 등 다양한 컨퍼런스가 열리고 있지만, 참여는 여전히 쉽지 않습니다.

높은 경쟁률과 제한된 참가 인원 대신, **더 많은 사람들이 기회를 얻고 컨퍼런스 문화가 더욱 활발**해지기를 바라는 마음으로 LiBoo 프로젝트를 기획했습니다.

### **LiBoo가 만드는 변화와 목표**

- **누구나** 쉽게 기술을 공유하고 배울 수 있는 열린 플랫폼
- **팀원 간 소규모 공유**부터 **기업 컨퍼런스 협업**까지 지원
- 더 많은 사람들이 참여할 수 있는 **기술 공유 기회 확대**

<br/>

# 📺 핵심 기능

![feature-main](https://github.com/user-attachments/assets/36f6b53e-10ac-47c8-bc71-e7e15596ff1b)
![feature-host](https://github.com/user-attachments/assets/a4092bc8-84eb-4a47-ada6-b135de0e3e85)
![feature-client](https://github.com/user-attachments/assets/340cd919-0c99-4285-8426-7e6329e97360)
![feature-chat-client](https://github.com/user-attachments/assets/f0cc9bc0-0d1a-41da-a348-4e2d2f908c7b)
![feature-chat-host](https://github.com/user-attachments/assets/84fe4260-a12e-48c4-94b1-401022793f12)

<br/>

# ⚙️ 서비스 아키텍처

![Streaming Data Architecture](https://github.com/user-attachments/assets/02e854c4-4512-482d-bda2-719b7ceabea6)

### 🎥 호스트

| **단계**                     | **설명**                                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **1. 방송 시작**             | 호스트는 **OBS**를 통해 방송을 시작합니다.                                                                                    |
| **2. 스트림 전송**           | OBS에서 생성된 **RTMP 스트림**을 **RTMP 서버**로 전송합니다.                                                                  |
| **3. 스트림 변환 및 업로드** | RTMP 서버는 스트림을 **HLS 세그먼트**(`.ts` 파일)와 **`index.m3u8`** 파일로 변환하고, 이를 **Object Storage**에 업로드합니다. |
| **4. 방송 정보 관리**        | **API 서버**와 방송 정보를 주고받아 클라이언트 대시보드에 방송을 노출시킵니다.                                                |
| **5. 실시간 시청**           | 클라이언트는 **Object Storage**에 직접 접근하여 **HLS 세그먼트**와 **`index.m3u8`** 파일을 통해 실시간 영상을 시청합니다.     |

<br />

### 💬 클라이언트

| **기능**           | **설명**                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **채팅 기능**      | 호스트를 포함한 모든 클라이언트는 **채팅 서버**와 통신하여 실시간으로 채팅을 주고받을 수 있습니다. |
| **채팅 종류**      | 채팅은 **질문**, **일반**, **공지**로 구분됩니다.                                                  |
| **질문 채팅 처리** | **질문 채팅**은 1차적으로 **Redis**에 캐싱되며, 방송 종료 후 **MySQL**에 영구 저장됩니다.          |

<br />

### 🚀 CI/CD

| **구성**      | **설명**                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| **배포 도구** | **프론트엔드**와 **백엔드**는 **GitHub Actions**, **Docker**, **Docker Swarm**을 활용하여 **NCP**에 배포됩니다. |

<br/>

# 📝 핵심 기술 정리
프로젝트를 진행하면서 겪은 다양한 경험과 학습 내용을 꾸준히 문서화하며 지식을 공유하고, 깊이 있는 기술적 도전을 이어나가고자 합니다.

## 전체
### [📹 동영상 스트리밍 처리 프로토콜을 알아보자](https://gominzip.notion.site/b987e92eb6c84eef9af1301877eb7c91?pvs=4)
- 처음 접하는 동영상 스트리밍 서비스의 동작 원리를 팀원들과 함께 이해하기
- 다양한 스트리밍 프로토콜(RTMP, WebRTC, HLS 등)을 검토한 결과, 실시간 단방향 스트리밍에 적합한 RTMP와 HLS 조합으로 결정

### [🚀 웹 소켓의 실시간 양방향 통신 (feat. WS vs Socket.io)](https://gominzip.notion.site/feat-WS-vs-Socket-io-13b673f3719e8037b430ff7b6af397b7?pvs=4)
- 채팅 구현을 위해 실시간 양방향 통신 구현 방식에 대한 학습 진행
- 생산성을 고려해 broadcast, namespace, 자동 재연결이 구현되어 있는 socket.io 라이브러리를 사용하기로 결정

## 프론트엔드의 기술적 도전
### [👷‍♀️ Shared Worker로 클라이언트의 소켓 통신 개선하기](https://gominzip.notion.site/Shared-Worker-14c673f3719e80379344fd026b1109a1?pvs=4)
- socket.io를 통한 채팅 기능을 구현했으나, 컴포넌트 마운트 시 매번 새로운 소켓이 생성되는 이슈
- shared worker thread를 도입해 다중 탭에서도 하나의 소켓을 공유할 수 있도록 개선

### [🚨 React-Query로 안정적인 스트리밍을 위한 로딩 및 에러 관리](https://gominzip.notion.site/React-Query-04ce24ffdb68478699c61b557625a843?pvs=4)
- HLS 영상을 받아오는 비동기 데이터 페칭에서의 에러 핸들링
- 각각의 컴포넌트에서 로딩과 에러처리를 독립적으로 진행한 방식에서부터 AsyncBoundary를 활용하여 효율적인 비동기 데이터 페칭관리와 ErrorPage 라우팅까지 처리

### [🐊 리액트 훅 폼 딥다이브](https://gominzip.notion.site/38fb796bb3034277885637e54f8747bb?pvs=4)
- 호스트 페이지에 사용되는 많은 인풋을 리액트 훅 폼을 활용해 효율적으로 관리
- 훅 폼의 개념과 핵심 기능을 이해하고, controlled vs uncontrolled 컴포넌트, 폼 상태 관리 최적화 및 검증 로직 구현 방법을 탐구

## 백엔드의 기술적 도전
### [☕️ NestJS를 통한 일관적인 시스템 설계](https://gominzip.notion.site/NestJS-ccb02a5403cd489ab1529799f17570b1?pvs=4)
- 서비스 별로 분리하여 확장이 쉽고, 유지 보수에 우수한 서버를 구축하고자 계획
- NestJS의 모듈화와 DI를 통해 각 도메인 간의 종속되지 않는 DDD 서비스 설계

### [🏛️ 확장성을 고려한 초반 구조 설계](https://gominzip.notion.site/f5f09f3143bf492e87c654ecbebec9a7?pvs=4)
- 각각의 서버가 intensive 한 부분을 고려해서 계획
- 서버를 분리해서 확장성을 고려

### [📮 채팅 서버에 Redis 를 쓴 이유](https://gominzip.notion.site/Redis-9be68c7746044d938a0dc65f9cdf47b1?pvs=4)
- 채팅 서버가 확장될 수 있음을 고려
- 채팅 서버 간, 데이터 공유를 위해 Redis 사용
- Redis 도 단일로 동작하지 않도록 redis-cluster 활용

### [🐬 서버를 docker swarm 으로 관리해보자](https://gominzip.notion.site/docker-swarm-80b228b59cf54d0e9221fc6c150e07bf?pvs=4)
- 서버를 도커 컨테이너로 올려서 docker-compose 로 관리
- docker swarm 으로 서버 인스턴스를 축소/확장할 수 있도록 관리

#### [👉 더 많은 기술정리 보러 가기 👈](https://gominzip.notion.site/12d673f3719e8098ad94ed6b71b10ac0?pvs=4)

<br/>

# 🛠️ 기술 스택

| Part       | Stack                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------- |
| 공통       | ![Group 15](https://github.com/user-attachments/assets/82b2beac-df23-48f4-814d-b46ec79d755e)   |
| 프론트엔드 |![Group 17](https://github.com/user-attachments/assets/9c57bf4e-df45-4319-9fb2-e5ffa58440b7)|
| 백엔드     | ![Group 16](https://github.com/user-attachments/assets/fa4933ca-0e46-4aab-ba3d-76614c332f73)|

<br/>

# TEAM 정권지르기 👊

|                                     김준서                                     |                                     김영길                                     |                                    고민지                                     |                                    김지수                                    |                                    홍창현                                    |
| :----------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/45356754?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/46553489?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/101329724?v=4" width="120"> | <img src="https://avatars.githubusercontent.com/u/85912592?v=4" width="120"> | <img src="https://avatars.githubusercontent.com/u/48922050?v=4" width="120"> |
|                                     **BE**                                     |                                     **BE**                                     |                                    **FE**                                     |                                    **FE**                                    |                                    **FE**                                    |
|                       [@i3kae](https://github.com/i3kae)                       |                    [@hoeeeeeh](https://github.com/hoeeeeeh)                    |                   [@gominzip](https://github.com/gominzip)                    |                    [@jsk3342](https://github.com/jsk3342)                    |                   [@spearStr](https://github.com/spearStr)                   |
