// function create(push) {
//     code = `
//         <div class="question-item" style="margin-top: 20px;">
//             <p class="question-title">${push.context1}</p>
//             <div class="${push.class}">
//                 <div class="${push.sonclass}">
//                     <label for="course-very-satisfied">非常满意</label>
//                     <input type="${push.type}" id="course-very-satisfied" name="course-satisfaction" value="非常满意" required>
//                 </div>
//                 <div class="${push.sonclass}">
//                     <label for="course-satisfied">满意</label>
//                     <input type="${push.type}" id="course-satisfied" name="course-satisfaction" value="满意">
//                 </div>
//                 <div class="${push.sonclass}">
//                     <label for="course-neutral">一般</label>
//                     <input type="${push.type}" id="course-neutral" name="course-satisfaction" value="一般">
//                 </div>
//                 <div class="${push.sonclass}">
//                     <label for="course-unsatisfied">不满意</label>
//                     <input type="${push.type}" id="course-unsatisfied" name="course-satisfaction" value="不满意">
//                 </div>
//                 <div class="${push.sonclass}">
//                     <label for="course-very-unsatisfied">非常不满意</label>
//                     <input type="${push.type}" id="course-very-unsatisfied" name="course-satisfaction" value="非常不满意">
//                 </div>
//             </div>
//             <div class="error-message" id="course-satisfaction-error">${push.context2}</div>
//         </div>
//     `;
//     return code;
// }

// const quest1 = create({
//     context1: '您对当前课程设置的满意度如何？',
//     context2: '请选择课程满意度',
//     class: 'rating-container',
//     sonclass: 'rating-item',
//     type: 'radio'
// });

// document.getElementById('form-group').innerHTML = quest1;

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('survey-form');
    const submitBtn = document.getElementById('submit-btn');

    // 所有必填字段
    const requiredFields = [
        'grade',
        'class',
        'course-satisfaction',
        'library-satisfaction',
        'club-participation',
        'overall-satisfaction'
    ];

    // 检查表单是否完整
    function checkFormCompletion() {
        let isComplete = true;

        // 检查所有必填字段
        requiredFields.forEach(fieldName => {
            const field = form.elements[fieldName];

            if (field.type === 'radio') {
                // 对于单选按钮组，检查是否至少有一个被选中
                const radioGroup = document.querySelectorAll(`input[name = "${fieldName}"]`);
                let isChecked = false;

                radioGroup.forEach(radio => {
                    if (radio.checked) isChecked = true;
                });

                if (!isChecked) {
                    isComplete = false;
                }
            } else {
                // 对于其他输入类型，检查是否有值
                if (!field.value.trim()) {
                    isComplete = false;
                }
            }
        });

        // 启用或禁用提交按钮
        submitBtn.disabled = !isComplete;
    }

    // 为所有表单元素添加事件监听
    form.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('change', checkFormCompletion);
        element.addEventListener('input', checkFormCompletion);
    });

    // 表单提交处理
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 检查表单是否完整
        let isFormValid = true;

        requiredFields.forEach(fieldName => {
            const field = form.elements[fieldName];
            const errorElement = document.getElementById(`${ fieldName } -error`);

            if (field.type === 'radio') {
                const radioGroup = document.querySelectorAll(`input[name = "${fieldName}"]`);
                let isChecked = false;

                radioGroup.forEach(radio => {
                    if (radio.checked) isChecked = true;
                });

                if (!isChecked) {
                    isFormValid = false;
                    if (errorElement) errorElement.style.display = 'block';
                } else {
                    if (errorElement) errorElement.style.display = 'none';
                }
            } else {
                if (!field.value.trim()) {
                    isFormValid = false;
                    if (errorElement) errorElement.style.display = 'block';
                } else {
                    if (errorElement) errorElement.style.display = 'none';
                }
            }
        });

        if (isFormValid) {
            // 成功后跳转页面地址
            window.location.href = 'success.html';
        }
    });

    // 初始检查表单状态
    checkFormCompletion();
});