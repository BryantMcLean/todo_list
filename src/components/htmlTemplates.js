// htmlTemplates.js

export const generateTodoListHTMLForiOS = (todoList) => {
    return todoList.map((todo, index) => {
        const createdDate = new Date(parseInt(todo.id));
        const formattedDate = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
        const finishedDate = todo.finishedDate ? new Date(todo.finishedDate) : null;
        const formattedFinishedDate = finishedDate
            ? `${finishedDate.toLocaleDateString()} ${finishedDate.toLocaleTimeString()}`
            : '';

        // Insert a page break after every X items
        const pageBreak = (index % 6 === 0 && index !== 0) ? '<div class="page-break"></div>' : '';

        return `
            ${pageBreak}
            <div class="todo-item">
                <span style="font-size: 20px"><strong>${todo.title}</strong></span><br/>
                ${todo.description ? `<span style="font-size: 14px">${todo.description}</span><br/>` : ''}
                <span style="font-size: 10px">Created on: ${formattedDate}</span><br/>
                ${formattedFinishedDate ? `<span style="font-size: 10px"><u>Finished on: ${formattedFinishedDate}</u></span><br/>` : '<span style="font-size: 10px">Not Completed</span>'}
            </div>
        `;
    }).join('');
};

export const generateTodoListHTMLForAndroid = (todoList) => {
    return todoList.map(todo => {
        const createdDate = new Date(parseInt(todo.id));
        const formattedDate = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
        const finishedDate = todo.finishedDate ? new Date(todo.finishedDate) : null;
        const formattedFinishedDate = finishedDate
            ? `${finishedDate.toLocaleDateString()} ${finishedDate.toLocaleTimeString()}`
            : '';

        return `
            <div class="todo-item">
                <span style="font-size: 20px"><strong>${todo.title}</strong></span><br/>
                ${todo.description ? `<span style="font-size: 14px">${todo.description}</span><br/>` : ''}
                <span style="font-size: 10px">Created on: ${formattedDate}</span><br/>
                ${formattedFinishedDate ? `<span style="font-size: 10px"><u>Finished on: ${formattedFinishedDate}</u></span><br/>` : '<span style="font-size: 10px">Not Completed</span>'}
            </div>
        `;
    }).join('');
};

export const htmlContentForiOS = (todoList) => `
<html>
<head>
    <style>
        @page {
            margin-top: 50px;
        }

         @page :first{
            margin-top: 0;
        }

        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .header-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }

        .header-container img {
            max-width: 100px;
            height: auto;
            margin-right: 20px;
        }

        .header-container h1 {
            font-size: 40px;
            font-family: Helvetica Neue;
            font-weight: normal;
            margin: 0;
        }
        .todo-list {
            display: block; /* Single column for iOS */
        }
        .todo-item {
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
            background-color: #f9f9f9;
            margin-bottom: 20px;
            page-break-inside: avoid;
            break-inside: avoid;
            display: block;
        }

        .page-break {
            page-break-before: always;
            margin-top: 50px; /* Apply margin to simulate spacing on new pages */
        }
    </style>
</head>
<body>
    <div class="header-container">
        <img src="https://infinitewebdevelopment.s3.us-west-2.amazonaws.com/EmptyFallback.png" alt="Empty Fallback Image"/>
        <h1>Todo List</h1>
    </div>
    <div class="todo-list">
        ${generateTodoListHTMLForiOS(todoList)}
    </div>
</body>
</html>
`;

export const htmlContentForAndroid = (todoList) => `
<html>
<head>
    <style>
         @page :first{
            margin-top: 0;
        }

        @page {
            margin-top: .5in;
        }

        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .header-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }

        .header-container img {
            max-width: 100px;
            height: auto;
            margin-right: 20px;
        }

        .header-container h1 {
            font-size: 40px;
            font-family: Helvetica Neue;
            font-weight: normal;
            margin: 0;
        }
        .todo-list {
            display: grid; /* Two columns for Android */
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .todo-item {
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
            background-color: #f9f9f9;
            margin-bottom: 20px;
            page-break-inside: avoid;
            break-inside: avoid;
            display: block;
        }
    </style>
</head>
<body>
    <div class="header-container">
        <img src="https://infinitewebdevelopment.s3.us-west-2.amazonaws.com/EmptyFallback.png" alt="Empty Fallback Image"/>
        <h1>Todo List</h1>
    </div>
    <div class="todo-list">
        ${generateTodoListHTMLForAndroid(todoList)}
    </div>
</body>
</html>
`;
