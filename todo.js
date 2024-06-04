

/*
//==================================================================================================
document.addEventListener('DOMContentLoaded', function() {
    const inputValue = document.getElementById("input");
    const button = document.getElementById("button");
    const hello = document.getElementById("hello");
    const output = document.getElementById("output");
    const finished = document.getElementById("finished");

    button.onclick = function() {
        if (inputValue.value) {
            const li = document.createElement("li");
            li.innerHTML = inputValue.value;
            inputValue.value = "";

            const btn_delete = document.createElement("button");
            btn_delete.innerHTML = "Delete";
            btn_delete.onclick = function() {
                hello.removeChild(li);
            };

            const btn_finished_task = document.createElement("button_2");
            btn_finished_task.innerHTML = "Finish task";
            btn_finished_task.onclick = function() {
                hello.removeChild(li);
                
                const finishedLi = document.createElement("li");
                finishedLi.innerHTML = li.innerHTML;

                const btn_delete_finished = document.createElement("button");
                btn_delete_finished.innerHTML = "Delete";
                btn_delete_finished.onclick = function() {
                    finished.removeChild(finishedLi);
                };

                finishedLi.appendChild(btn_delete_finished);

                const finishButton = finishedLi.querySelector('button');
                finishedLi.removeChild(finishButton);

                finished.appendChild(finishedLi);
            };

            li.appendChild(btn_delete);
            li.appendChild(btn_finished_task);

            hello.appendChild(li);

            if (output) {
                output.innerHTML = "";
            }
        } else {
            output.innerHTML = "Please Input Your Todo List Here";
        }
    };
});
//===================================================================================================
 */











//-----------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const inputValue = document.getElementById("input");
    const button = document.getElementById("button");
    const hello = document.getElementById("hello");
    const output = document.getElementById("output");
    const finished = document.getElementById("finished");

    loadTasks();

    inputValue.addEventListener("keyup", function(e) {
        if (e.keyCode === 13 && inputValue.value) { 
            addTask(inputValue.value);
            inputValue.value = "";
            if (output) {
                output.innerHTML = "";
            }
        }
    });

    button.onclick = function() {
        if (inputValue.value) {
            addTask(inputValue.value);
            inputValue.value = "";

            if (output) {
                output.innerHTML = "";
            }
        } else {
            output.innerHTML = "Please Input Your Todo List Here";
        }
    };

    function addTask(task) {
        const li = document.createElement("li");
        li.textContent = task;

        const btn_delete = document.createElement("button");
        btn_delete.textContent = "Delete";
        btn_delete.onclick = function() {
            hello.removeChild(li);
            saveTasks();
        };

        const btn_finished_task = document.createElement("button_2");
        btn_finished_task.textContent = "Finish task";
        btn_finished_task.onclick = function() {
            hello.removeChild(li);
            addFinishedTask(task);
            saveTasks();
        };

        li.appendChild(btn_delete);
        li.appendChild(btn_finished_task);
        hello.appendChild(li);

        saveTasks();
    }

    function addFinishedTask(task) {
        const finishedLi = document.createElement("li");
        finishedLi.textContent = task;

        const btn_delete_finished = document.createElement("button");
        btn_delete_finished.textContent = "Delete";
        btn_delete_finished.onclick = function() {
            finished.removeChild(finishedLi);
            saveTasks();
        };

        finishedLi.appendChild(btn_delete_finished);
        finished.appendChild(finishedLi);

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        const finishedTasks = [];

        hello.querySelectorAll('li').forEach(li => {
            tasks.push(li.childNodes[0].textContent);
        });

        finished.querySelectorAll('li').forEach(li => {
            finishedTasks.push(li.childNodes[0].textContent);
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const finishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];

        tasks.forEach(task => addTask(task));
        finishedTasks.forEach(task => addFinishedTask(task));
    }
});
