class Medicine {
    constructor(name, id, manufacturer, expirationDate, quantity) {
        this.name = name;
        this.id = id;
        this.manufacturer = manufacturer;
        this.expirationDate = expirationDate;
        this.quantity = quantity;
    }
}

class PharmacyInventory {
    constructor() {
        this.medicines = JSON.parse(localStorage.getItem('medicines')) || [];
    }

    addMedicine(medicine) {
        this.medicines.push(medicine);
        localStorage.setItem('medicines', JSON.stringify(this.medicines));
    }

    deleteMedicine(id) {
        this.medicines = this.medicines.filter(medicine => medicine.id !== id);
        localStorage.setItem('medicines', JSON.stringify(this.medicines));
    }

    displayMedicines() {
        const medicineList = document.getElementById('medicineList');
        medicineList.innerHTML = '';

        this.medicines.forEach(medicine => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${medicine.name}</td>
                <!-- Add other table data -->
                <td><button onclick="pharmacyInventory.deleteMedicine('${medicine.id}')">Delete</button></td>
            `;
            medicineList.appendChild(row);
        });
    }
}

const pharmacyInventory = new PharmacyInventory();

document.addEventListener('DOMContentLoaded', () => {
    const medicineForm = document.getElementById('medicineForm');
    medicineForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        // Get other form fields' values and perform validation
        // Create a new Medicine object
        // Add the medicine to the inventory
        // Display medicines
    });

    pharmacyInventory.displayMedicines();
});
