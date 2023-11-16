# 자율 프로젝트

> | [요구사항 정의서](https://fixed-crater-6a0.notion.site/6b3711c806744af0b92856fb73e5207d?pvs=4)
| [기능 명세서](https://www.notion.so/5998483e94754377be0dbb4933324076?pvs=4)
| [피그마](https://www.figma.com/file/glrcIrx3hFETq4PgP8wHR1/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?type=design&node-id=0-1&mode=design&t=S3B5aodiF6ypW7h3-0)
| [ERD Cloud](https://www.erdcloud.com/d/J5PZXvAnuG5PkqsBa)
| [API 명세서](https://fixed-crater-6a0.notion.site/API-a10ee7adc00a4b4d894c400f117365c8?pvs=4)
# 실전 압축 면접(실압면)
> ChatGPT를 활용한 모의면접 서비스입니다. 
<br>
개발 기간 : 2023.10.09 ~2023.11.17

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]


- 자기소개서를 등록하고 개인 면접 일정을  관리할 수 있습니다.
- 자기소개서에 기반한 개인 맞춤형 질문, 기술 면접과 인성 면접에 대비한 질문을 제공합니다.
- 연습 면접, 실전 면접, 자율 면접 세가지 유형에 따라 연습해 볼 수 있습니다.
- 실전 면접 종료 시 면접 영상과 질문, 답변을 포함한 리포트가 제공됩니다. 
- 리포트를 커뮤니티에 


![](../header.png)
## 서비스 페이지
|로그인|자소서 등록|면접 캘린더|
|------|---|---|
|<img src = "./img/자소서.png"/>|<img src = "./img/자소서.png"/>|<img src = "./img/자소서.png"/>|

-


## 사용 예제

스크린 샷과 코드 예제를 통해 사용 방법을 자세히 설명합니다.

_더 많은 예제와 사용법은 [Wiki][wiki]를 참고하세요._

## 개발 환경 설정

모든 개발 의존성 설치 방법과 자동 테스트 슈트 실행 방법을 운영체제 별로 작성합니다.

```sh
make install
npm test
```

## 업데이트 내역

* 0.2.1
    * 수정: 문서 업데이트 (모듈 코드 동일)
* 0.2.0
    * 수정: `setDefaultXYZ()` 메서드 제거
    * 추가: `init()` 메서드 추가
* 0.1.1
    * 버그 수정: `baz()` 메서드 호출 시 부팅되지 않는 현상 (@컨트리뷰터 감사합니다!)
* 0.1.0
    * 첫 출시
    * 수정: `foo()` 메서드 네이밍을 `bar()`로 수정
* 0.0.1
    * 작업 진행 중

## 정보

이름 – [@트위터 주소](https://twitter.com/dbader_org) – 이메일주소@example.com

XYZ 라이센스를 준수하며 ``LICENSE``에서 자세한 정보를 확인할 수 있습니다.

[https://github.com/yourname/github-link](https://github.com/dbader/)

## 기여 방법

1. (<https://github.com/yourname/yourproject/fork>)을 포크합니다.
2. (`git checkout -b feature/fooBar`) 명령어로 새 브랜치를 만드세요.
3. (`git commit -am 'Add some fooBar'`) 명령어로 커밋하세요.
4. (`git push origin feature/fooBar`) 명령어로 브랜치에 푸시하세요. 
5. 풀리퀘스트를 보내주세요.

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki