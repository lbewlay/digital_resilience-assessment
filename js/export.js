async function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const resultsButtons = document.querySelector('#results-page .btn-group');
    const exportBtn = document.getElementById('export-pdf-btn');
    const originalBtnText = exportBtn.textContent;

    exportBtn.textContent = 'Generating...';
    exportBtn.disabled = true;
    resultsButtons.style.display = 'none';

    try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        const contentWidth = pdfWidth - (margin * 2);
        let currentY = margin;

        // Helper function to check if a new page is needed
        const checkPageBreak = (elementHeight) => {
            if (currentY + elementHeight > pageHeight - margin) {
                pdf.addPage();
                currentY = margin;
            }
        };

        // Helper function to render an HTML element to a canvas and add it to the PDF
        const addCanvasToPdf = async (element) => {
            if (!element) return;
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const ratio = canvas.width / canvas.height;
            const imgHeight = contentWidth / ratio;

            checkPageBreak(imgHeight); // Check space before adding
            pdf.addImage(imgData, 'PNG', margin, currentY, contentWidth, imgHeight);
            currentY += imgHeight + 10; // Add padding after the element
        };

        // 1. Add the initial sections one by one
        await addCanvasToPdf(document.querySelector('#results-page .results-summary'));
        await addCanvasToPdf(document.querySelector('#results-page .category-breakdown'));
        await addCanvasToPdf(document.querySelector('#results-page .threats-section'));

        // 2. Handle the recommendations section separately to manage its children
        const recommendationsSection = document.querySelector('#results-page .recommendations-section');
        if (recommendationsSection) {
            // Add the main "Personalized Recommendations" title as text
            const titleHeight = 12;
            checkPageBreak(titleHeight);
            pdf.setFontSize(20);
            pdf.setFont(undefined, 'bold');
            pdf.setTextColor('#005f73'); // Use the actual hex color
            pdf.text('Personalized Recommendations', margin, currentY);
            currentY += titleHeight;

            // Now, process each recommendation sub-section (Immediate, Short-term, etc.) individually
            const recommendationSubsections = document.getElementById('recommendations-container').children;
            for (const subsection of recommendationSubsections) {
                await addCanvasToPdf(subsection);
            }
        }

        pdf.save('Digital-Resilience-Assessment-Report.pdf');

    } catch (error) {
        console.error("Failed to generate PDF:", error);
    } finally {
        // Restore the UI
        resultsButtons.style.display = 'flex';
        exportBtn.textContent = originalBtnText;
        exportBtn.disabled = false;
    }
}
