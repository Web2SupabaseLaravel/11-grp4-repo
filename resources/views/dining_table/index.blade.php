<!DOCTYPE html>
<html>
<head>
    <title>Dining Table CRUD</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>

<h1>قائمة الطاولات</h1>
<ul id="table-list">
    @foreach($table as $item)
        <li>
            رقم: {{ $item->number }}, السعة: {{ $item->seating_capacity }}, الحالة: {{ $item->status ? 'متاحة' : 'مشغولة' }}
            <button onclick="deleteTable({{ $item->table_id }})">حذف</button>
        </li>
    @endforeach
</ul>

<h2>إضافة طاولة جديدة</h2>
<form id="add-table-form">
    @csrf
    <label>Restaurant ID:</label>
    <input type="number" name="restaurant_id" required><br>

    <label>رقم الطاولة:</label>
    <input type="number" name="number" required><br>

    <label>سعة الجلوس:</label>
    <input type="number" name="seating_capacity" required><br>

    <label>الموقع:</label>
    <input type="text" name="location"><br>

    <label>الحالة:</label>
    <select name="status" required>
        <option value="1">متاحة</option>
        <option value="0">مشغولة</option>
    </select><br><br>

    <button type="submit">أضف الطاولة</button>
</form>

<script>
document.getElementById('add-table-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        restaurant_id: Number(form.restaurant_id.value),
        number: Number(form.number.value),
        seating_capacity: Number(form.seating_capacity.value),
        location: form.location.value,
        status: form.status.value === "1",
    };

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const response = await fetch("{{ route('dining-table.store') }}", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('تم إضافة الطاولة بنجاح');
        location.reload();
    } else {
        const errorData = await response.json();
        alert('فشل الإضافة: ' + JSON.stringify(errorData.errors));
    }
});

async function deleteTable(id) {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    if (!confirm('هل تريد حذف هذه الطاولة؟')) return;

    const response = await fetch(`/dining-table/${id}`, {
        method: 'DELETE',
        headers: {
            'X-CSRF-TOKEN': token,
        }
    });

    if (response.ok) {
        alert('تم الحذف');
        location.reload();
    } else {
        alert('فشل الحذف');
    }
}
</script>

</body>
</html>