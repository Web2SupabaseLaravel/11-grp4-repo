<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>قائمة المستخدمين</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>

    <h1>قائمة المستخدمين</h1>

    <ul>
        @foreach($users as $user)
            <li>
                {{ $user->email }} - الدور: {{ $user->roletype }}
            </li>
        @endforeach
    </ul>

    <h2>إضافة مستخدم جديد</h2>

    <form id="add-user-form">
        <label>البريد الإلكتروني:</label>
        <input type="email" name="email" required><br>

        <label>كلمة المرور:</label>
        <input type="password" name="password" required><br>

        <label>الدور:</label>
        <input type="text" name="roletype" required><br>

        <label>معرف المطعم (اختياري):</label>
        <input type="number" name="restaurant_id"><br>

        <label>تسجيل عبر الشبكات الاجتماعية:</label>
        <select name="social_login">
            <option value="0">لا</option>
            <option value="1">نعم</option>
        </select><br>

        <label>نشط:</label>
        <select name="is_active">
            <option value="1">نعم</option>
            <option value="0">لا</option>
        </select><br>

        <button type="submit">أضف مستخدم</button>
    </form>

    <script>
        document.getElementById('add-user-form').addEventListener('submit', async function(e) {
            e.preventDefault();

            const form = e.target;
            const data = {
                email: form.email.value,
                password: form.password.value,
                roletype: form.roletype.value,
                restaurant_id: form.restaurant_id.value ? Number(form.restaurant_id.value) : null,
                social_login: form.social_login.value === "1",
                is_active: form.is_active.value === "1",
            };

            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const response = await fetch("/users", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
        'Accept': 'application/json',
    },
    body: JSON.stringify(data)
});


            if (response.ok) {
                alert('✅ تم إضافة المستخدم بنجاح');
                location.reload();
            } else {
                let messages = '';
                try {
                    const errorData = await response.json();
                    if (errorData.errors) {
                        for (const key in errorData.errors) {
                            messages += `${key}: ${errorData.errors[key].join(', ')}\n`;
                        }
                    } else {
                        messages = JSON.stringify(errorData);
                    }
                } catch (e) {
                    messages = "فشل في الاتصال بالسيرفر أو تنسيق غير متوقع.";
                }
                alert('❌ فشل الإضافة:\n' + messages);
            }
        });


    </script>

</body>
</html>
