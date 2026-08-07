import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Download, FileText, Table, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ExportReportModal = ({ isOpen, onClose, members = [], attendance = [], plans = [] }) => {
  const { showToast } = useAuth();
  const [reportType, setReportType] = useState('members');
  const [format, setFormat] = useState('csv');

  const handleExport = () => {
    try {
      let content = '';
      let filename = `FitSphere_${reportType}_report_${new Date().toISOString().split('T')[0]}.${format}`;

      if (reportType === 'members') {
        content = 'Member Code,Full Name,Gender,Email,Mobile,Plan,Status,Join Date,Expiry Date\n';
        members.forEach((m) => {
          content += `"${m.member_code}","${m.full_name}","${m.gender}","${m.email}","${m.mobile}","${m.membership_name}","${m.status}","${m.joining_date}","${m.expiry_date}"\n`;
        });
      } else if (reportType === 'attendance') {
        content = 'Date,Member ID,Member Name,Check In,Check Out,Status\n';
        attendance.forEach((a) => {
          content += `"${a.date}","${a.member_code}","${a.member_name}","${a.check_in}","${a.check_out}","${a.status}"\n`;
        });
      } else {
        content = 'Plan Name,Duration Months,Price USD,Facilities Count,Members Count,Status\n';
        plans.forEach((p) => {
          content += `"${p.name}","${p.duration_months}","${p.price}","${p.facilities?.length || 0}","${p.members_count || 0}","${p.status}"\n`;
        });
      }

      const blob = new Blob([content], { type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported ${reportType} report successfully as ${filename}!`, 'success');
      onClose();
    } catch (err) {
      showToast('Export failed: ' + err.message, 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export System Reports" maxWidth="max-w-md">
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Select Report Dataset</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'members', label: 'Members' },
              { id: 'attendance', label: 'Attendance' },
              { id: 'revenue', label: 'Plans & Revenue' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setReportType(item.id)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                  reportType === item.id
                    ? 'bg-[#8DFF2F]/20 text-[#8DFF2F] border-[#8DFF2F]'
                    : 'bg-white/[0.03] text-gray-400 border-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">File Format</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('csv')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                format === 'csv' ? 'bg-[#8DFF2F]/20 text-[#8DFF2F] border-[#8DFF2F]' : 'bg-white/[0.03] text-gray-400 border-white/10'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>CSV Spreadsheet</span>
            </button>

            <button
              type="button"
              onClick={() => setFormat('txt')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                format === 'txt' ? 'bg-[#8DFF2F]/20 text-[#8DFF2F] border-[#8DFF2F]' : 'bg-white/[0.03] text-gray-400 border-white/10'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Summary Text</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-xs hover:bg-[#7CE822] shadow-[0_0_20px_rgba(141,255,47,0.3)] transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
