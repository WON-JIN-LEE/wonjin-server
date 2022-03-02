# API docs

## 📋 게시판
 
<details>
  <summary>전체 목록 조회 API</summary>

### Request

- Method: `GET`
- URL: `/post`

### Response

- HTTP Status Code: `200`
- Payload:
  ```jsx
  // upload_date을 기준으로 내림차순 정렬된 Array
  {post_id : number,nickname : string,post_img : img_url(string),post_content : string,post_like : number,upload_date : date ,img_position : left or right or default}[]
  ```
</details>


<details>
  <summary>글 상세 조회 API</summary>

### Request

- Method: `GET`
- URL: `/post/:postId`
### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { name: string, title: string, content: string, date: string, post_id: number }
    ```
    </details>


<details>
  <summary>추가 API</summary>

### Request

- Method: `POST`
- URL: `/post`
- Headers: { authorization: `Bearer ${token}` }
- Body:
    ```jsx
    { post_content: string, post_img: string, img_position : left or right or default }
    ```

### Response

- HTTP Status Code: `201`
- Payload:
    
    ```jsx
    { msg: string }
    ```

</details>


<details>
  <summary>수정 API</summary>

### Request

- Method: `PUT`
- URL: `/post/:postId`
- Headers: { authorization: `Bearer ${token}` }
- Body:
    
    ```jsx
    { post_img: string, post_content: string,  img_position : left or right or default }
    ```

### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { msg: string }
    ```
</details>

<details>
  <summary>삭제 API</summary>

### Request

- Method: `DELETE`
- URL: `/post/:postId`
- Headers: { authorization: `Bearer ${token}` }

### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { msg: string }
    ```
</details>


<details>
  <summary>좋아요 API</summary>

### Request

- Method: `PUT`
- URL: `/post/:postId/like`
- Headers: { authorization: `Bearer ${token}` }

### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { msg: string, like_check: boolean }
    ```
</details>
___

    
## 📋 회원관리

<details>
  <summary>회원가입 API</summary>

### Request

- Method: `POST`
- URL: `/register`
- Body:
    ```jsx
    { user_id: string, nickname: string, user_pw: string , pw_check: string  }
    ```
### Response

- HTTP Status Code: `200`
- Payload:
    ```jsx
    { mag: string }
    ```
</details>


<details>
  <summary>로그인 API</summary>

### Request

- Method: `POST`
- URL: `/login`
- Body:
    ```jsx
    { name: string, comment: string }
    ```

### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { msg: string, mytoken: token_string, nickname:string}
    ```

</details>

