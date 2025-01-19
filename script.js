document.addEventListener("DOMContentLoaded", () => {
  const rows = [
    {
      box: document.getElementById("box1"),
      boxNos: document.getElementById("boxNos1"),
      boxNosInput: document.getElementById("boxNosInput1"),
      totalPatti: document.getElementById("totalPatti1"),
      remainingPatti: document.getElementById("remainingPatti1"),
      pattiAdjustment: document.getElementById("pattiAdjustment1"),
      rsTotal: document.getElementById("rsTotal1"),
      multiplier: 24,
      rate: 34,
      adjustFactor: 1,
    },
    {
      box: document.getElementById("box2"),
      boxNos: document.getElementById("boxNos2"),
      boxNosInput: document.getElementById("boxNosInput2"),
      totalPatti: document.getElementById("totalPatti2"),
      remainingPatti: document.getElementById("remainingPatti2"),
      pattiAdjustment: document.getElementById("pattiAdjustment2"),
      rsTotal: document.getElementById("rsTotal2"),
      multiplier: 192,
      rate: 4.5,
      adjustFactor: 12,
    },
  ];

  function updateRow(row) {
    const B = parseFloat(row.box.value) || 0;
    const D = parseFloat(row.boxNosInput.value) || 0;

    const C = B / row.multiplier;
    const E = D * row.multiplier;
    const F = B - E;
    const G = F / row.adjustFactor;
    const H = B * row.rate;

    row.boxNos.value = C.toFixed(2);
    row.totalPatti.value = E.toFixed(2);
    row.remainingPatti.value = F.toFixed(2);
    row.pattiAdjustment.value = G.toFixed(2);
    row.rsTotal.value = H.toFixed(2);
  }

  rows.forEach((row) => {
    row.box.addEventListener("input", () => updateRow(row));
    row.boxNosInput.addEventListener("input", () => updateRow(row));
  });

  document.querySelectorAll(".downloadPdfBtn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const rowIndex = e.target.getAttribute("data-row") - 1;
      const row = rows[rowIndex];

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.autoTable({
        head: [
          [
            "Item Name",
            "Box (B)",
            "Box Nos (C)",
            "Box Nos Input (D)",
            "Total Patti (E)",
            "Remaining Patti (F)",
            "Patti Adjustment (G)",
            "RS/Total (H)",
          ],
        ],
        body: [
          [
            rowIndex === 0
              ? "135GM*24 CRUNCHEM CREAM & ONION WAFERS"
              : "15GM*192 CRUNCHEM MASALA MASTI WAFERS",
            row.box.value || "0",
            row.boxNos.value || "0.00",
            row.boxNosInput.value || "0",
            row.totalPatti.value || "0.00",
            row.remainingPatti.value || "0.00",
            row.pattiAdjustment.value || "0.00",
            row.rsTotal.value || "0.00",
          ],
        ],
        startY: 20,
        theme: "striped", // Adding striped rows for a clean look
      });

      doc.save("record_" + (rowIndex + 1) + ".pdf");
    });
  });

  const downloadAllButton = document.getElementById("downloadAllButton");
  downloadAllButton.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const filteredRows = rows.filter(
      (row) => parseFloat(row.box.value) > 0 || parseFloat(row.boxNosInput.value) > 0
    );

    if (filteredRows.length === 0) {
      alert("No valid data to include in the PDF.");
      return;
    }

    doc.autoTable({
      head: [
        [
          "Item Name",
          "Box (B)",
          "Box Nos (C)",
          "Box Nos Input (D)",
          "Total Patti (E)",
          "Remaining Patti (F)",
          "Patti Adjustment (G)",
          "RS/Total (H)",
        ],
      ],
      body: filteredRows.map((row, index) => [
        index === 0
          ? "135GM*24 CRUNCHEM CREAM & ONION WAFERS"
          : "15GM*192 CRUNCHEM MASALA MASTI WAFERS",
        row.box.value || "0",
        row.boxNos.value || "0.00",
        row.boxNosInput.value || "0",
        row.totalPatti.value || "0.00",
        row.remainingPatti.value || "0.00",
        row.pattiAdjustment.value || "0.00",
        row.rsTotal.value || "0.00",
      ]),
      startY: 20,
      theme: "striped",
    });

    doc.save("all_records.pdf");
  });
});
