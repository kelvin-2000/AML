# API Endpoints

 
> [!NOTE]  
> Click on text to expand details.

## 1. Borrow API Endpoints

**_Endpoint_**: POST /borrow

**_Description_**: Borrow a media item from the library system.

**_Headers_**:

-   `Content-Type`: application/json

**_Request Body_**:

```json
{
  "memberId": 123,
  "mediaId": 456,
  "dueDate": "2025-01-15",
  "pickupDeliveryChoice": "pickup"
}

```

_**Response**_:

-   **Status**: 200 OK
-   **Body**:

```json
{
  "message": "Borrowing successful.",
  "requestId": 789
}

```

## 2. Return API Endpoints

**_Endpoint_**: POST /return

**_Description_**: Return a borrowed media item to the library system.

**_Headers_**:

-   `Content-Type`: application/json

**_Request Body_**:

```json
{
  "memberId": 123,
  "mediaId": 456
}

```

_**Response**_:

-   **Status**: 200 OK
-   **Body**:

```json
{
  "message": "Media returned successfully.",
  "result": {
    "memberId": 123,
    "mediaId": 456,
    "returnDate": "2025-01-02"
  }
}

```

## 3. Media API Endpoints

**_Endpoint_**: GET /media

**_Description_**: Fetch a paginated list of media items available in the system.

**_Query Parameters_**:

-   `page`: The page number (default: 1)
-   `limit`: The number of items per page (default: 10)

_**Response**_:

-   **Status**: 200 OK
-   **Body**:

```json
[
  {
    "mediaID": 1,
    "mediaName": "The Great Gatsby",
    "creator": "F. Scott Fitzgerald",
    "publisher": "Scribner",
    "year": 1925,
    "typeID": 1
  },
  {
    "mediaID": 2,
    "mediaName": "The Hobbit",
    "creator": "J.R.R. Tolkien",
    "publisher": "Houghton Mifflin",
    "year": 1937,
    "typeID": 1
  }
]

```

## 4. Member API Endpoints

**_Endpoint_**: GET /members

**_Description_**: Retrieve a list of all members with formatted details.

_**Response**_:

-   **Status**: 200 OK
-   **Body**:

```json
[
  {
    "memberId": 123,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "membershipDate": "2022-03-14"
  },
  {
    "memberId": 124,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "membershipDate": "2021-05-21"
  }
]

```
