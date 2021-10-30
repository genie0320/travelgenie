### 파일의 로컬저장을 위한 json server 준비.
설치 : npm install -g json-server
실행 : json-server --watch ./data/db. (파일경로)

#### VScode 에서 json-server 실행오류 해결.
문구 : json-server : 이 시스템에서 스크립트 를 실행할 수 없으므로..에러 해결
원인 : 스크립트 실행권한이 제한되어 있어서 그렇다고 한다.

1) Powershell을 '관리자권한'으로 실행한다. VScode terminal에서는 안됨.
2) executionPolicy 를 입력하여, 현재의 권한을 확인한다. 
- 내 경우에는 Default 설정인 Restricted 가 나왔다.
* get-help Set-ExecutionPolicy 를 이용하면 설정할 수 있는 권한목록을 볼 수 있다.

3) Set-ExecutionPolicy RemoteSigned 를 입력하여, 권한을 변경한다.
- 검색해보니 대부분 'RemoteSigned'로 설정하더라.
* 이후에 json-server --watch './data/db.json' 실행하면 OK.

#### json 파일의 기본적인 작성방법
- 각 item은 하나의 api end-point로 감싸줄 예정.
{
    "item" : [
        {
            "property" : "value",
            "property2" : "value2"
        },
        {
            "property3" : "value3",
            "property4" : "value4"
        }
    ],
    "item2" : [ ... ]
}

### 기타
#### VScode의 기본폰트를 '네이버 D2Coding ligature'로 변경.
1) 폰트다운 및 설치 : https://github.com/naver/d2codingfont 
    - Ver1.3.2 > D2CodingAll 사용.
2) VScode 설정변경 : Preference > textEditor > font
    - Font family 의 가장 앞부분에 'D2Coding ligature' 추가.
    - Font ligatures 에 "editor.fontLigatures": true, 추가.
3) VScode 재시작.

