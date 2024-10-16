function PatientForm() {
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    return `
        <form id="patientForm">
            <input type="text" id="hn" placeholder="HN (สร้างอัตโนมัติ)" readonly>
            <input type="text" id="treatmentDate" placeholder="วันที่มารักษา" readonly>
            <input type="text" id="name" placeholder="ชื่อ-นามสกุล" required>
            <input type="text" id="nationalId" placeholder="เลขบัตรประจำตัวประชาชน" required>
            <input type="date" id="birthdate" required onchange="document.getElementById('age').value = calculateAge(this.value)">
            <input type="text" id="age" placeholder="อายุ" readonly>
            <input type="text" id="occupation" placeholder="อาชีพ">
            <textarea id="address" placeholder="ที่อยู่"></textarea>
            <input type="tel" id="phone" placeholder="เบอร์โทรศัพท์">
            <textarea id="underlyingDisease" placeholder="โรคประจำตัว"></textarea>
            <textarea id="allergies" placeholder="ประวัติการแพ้ยา"></textarea>
            <button type="submit">บันทึกข้อมูล</button>
        </form>
    `;
}

export default PatientForm;