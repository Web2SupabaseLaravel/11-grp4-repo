<!DOCTYPE html>
<html>
<head>
    <title>معلومات العملاء</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>

<h1>قائمة العملاء</h1>

<ul>
    @foreach($customers as $customer)
        <li>
            المستخدم: {{ $customer->user_id }}, الملاحظات: {{ $customer->notes }}, التفضيلات: {{ $customer->preferences ?? 'لا توجد' }}
        </li>
    @endforeach
</ul>

<h2>إضافة عميل جديد</h2>
<form id="add-customer-form">
    @csrf
    <label>User ID:</label>
    <input type="number" name="user_id" required><br>

    <label>Notes:</label>
    <textarea name="notes" required></textarea><br>

    <label>Preferences:</label>
    <textarea name="preferences"></textarea><br>

    <button type="submit">أضف العميل</button>
</form>

<script>
document.getElementById('add-customer-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        user_id: Number(form.user_id.value),
        notes: form.notes.value,
        preferences: form.preferences.value,
    };

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const response = await fetch("{{ route('CustomerInfo.store') }}", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('تم إضافة العميل بنجاح');
        location.reload();
    } else {
        const errorData = await response.json();
        let messages = '';
        if (errorData.errors) {
            for (const key in errorData.errors) {
                messages += `${key}: ${errorData.errors[key].join(', ')}\n`;
            }
        } else {
            messages = JSON.stringify(errorData);
        }
        alert('فشل الإضافة:\n' + messages);
    }
});
</script>

</body>
</html>
