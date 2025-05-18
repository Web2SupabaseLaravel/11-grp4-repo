<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>


    <div class="container">
        <h2>إضافة مستخدم جديد</h2>

        @if(session('success'))
            <div style="color: green;">{{ session('success') }}</div>
        @endif

        @if ($errors->any())
            <div style="color: red;">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="{{ route('admin.users.store') }}">
            @csrf

            <div>
                <label for="email">البريد الإلكتروني:</label>
                <input type="email" name="email" id="email" required>
            </div>

            <div>
                <label for="password">كلمة المرور:</label>
                <input type="password" name="password" id="password" required>
            </div>

            <div>
                <label for="roletype">الدور (roletype):</label>
                <select name="roletype" id="roletype" required>
                    <option value="admin">مدير</option>
                    <option value="manager">مدير مطعم</option>
                    <option value="staff">موظف</option>
                    <option value="customer">عميل</option>
                </select>
            </div>

            <div>
                <label for="restaurant_id">رقم المطعم (اختياري):</label>
                <input type="number" name="restaurant_id" id="restaurant_id">
            </div>

            <div>
                <label>
                    <input type="checkbox" name="social_login" value="1">
                    تسجيل عبر سوشال؟
                </label>
            </div>

            <div>
                <label>
                    <input type="checkbox" name="is_active" value="1" checked>
                    نشط؟
                </label>
            </div>

            <button type="submit">إنشاء المستخدم</button>
        </form>
    </div>

</body>
</html>