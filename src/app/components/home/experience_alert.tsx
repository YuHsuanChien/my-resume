'use client';
import { useEffect, useState, useCallback } from 'react';
import { useExperienceAlertStore } from '@/stores/inedex';
import Image from 'next/image';

// 定義 Experience 資料型別
interface ExperienceData {
  company: string;
  title: string;
  duration: string;
  location: string;
  responsibilities: string[];
  type: string;
  technologies: string[];
  img: string;
}

// 通用資訊顯示組件
const InfoField = ({
  label,
  value,
  fieldType,
  loading,
  error,
}: {
  label: string;
  value: string | string[];
  fieldType: string;
  loading: boolean;
  error: string | null;
}) => {
  const renderValue = () => {
    if (loading) return 'Fetching latest updates...';
    if (error) return `Failed to load: ${error}`;

    if (Array.isArray(value) && fieldType === 'responsibilities') {
      return (
        <ul className="list-disc list-inside">
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else if (Array.isArray(value)) {
      return `[${value.join(', ')}]`;
    }
    return value;
  };

  return (
    <p className="text-gray-300 text-sm leading-6 mb-1">
      <span>{label}：</span>
      <span>{renderValue()}</span>
    </p>
  );
};

export default function ExperienceAlert() {
  const { experienceAlertIsOpen, type, setExperienceAlertIsOpen } =
    useExperienceAlertStore();

  const [experienceData, setExperienceData] = useState<ExperienceData[]>([]);
  const [selectedData, setSelectedData] = useState<ExperienceData>(
    {} as ExperienceData,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 使用 useCallback 優化函數
  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/json/experience.json'); // 更好的 API 路徑
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ExperienceData[] = await response.json();
      setExperienceData(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error fetching experience data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 處理關閉
  const handleClose = useCallback(() => {
    setExperienceAlertIsOpen(false);
  }, [setExperienceAlertIsOpen]);

  // 處理 body overflow
  useEffect(() => {
    const documentBody = document.body;
    const originalOverflow = documentBody.style.overflow;

    documentBody.style.overflow = experienceAlertIsOpen ? 'hidden' : 'auto';

    // 清理函數：恢復原始值
    return () => {
      documentBody.style.overflow = originalOverflow;
    };
  }, [experienceAlertIsOpen]);

  // 獲取資料 - 只在元件掛載時執行一次
  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (experienceData.length > 0 && type) {
      const filteredData = experienceData.filter((item) => item.type === type);
      if (filteredData.length > 0) {
        setSelectedData(filteredData[0]);
      }
    }
  }, [experienceData, type]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 z-50 transition-all duration-800 origin-center ${
        experienceAlertIsOpen
          ? 'transform -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100'
          : 'transform -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-md text-white p-6 rounded-xl shadow-2xl border border-cyan-400/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // 防止點擊內容時關閉
      >
        {/* 科技感背景動畫 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-l from-transparent via-cyan-300/5 to-transparent animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>

        {/* 科技感邊框光效 */}
        <div className="absolute inset-0 rounded-xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-cyan-400/80 to-transparent"></div>
          <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"></div>
        </div>

        {/* 關閉按鈕 */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200 z-20"
          aria-label="關閉提醒"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 內容 */}
        <div className="relative z-10">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <p className="font-bold text-xl bg-gradient-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent mb-2">
                {loading
                  ? 'Loading...'
                  : error
                  ? 'Error!'
                  : selectedData.company}
              </p>

              <InfoField
                label="職稱"
                fieldType="title"
                value={selectedData.title || ''}
                loading={loading}
                error={error}
              />

              <InfoField
                label="期間"
                fieldType="duration"
                value={selectedData.duration || ''}
                loading={loading}
                error={error}
              />

              <InfoField
                label="負責"
                fieldType="responsibilities"
                value={selectedData.responsibilities || []}
                loading={loading}
                error={error}
              />

              <InfoField
                label="技能"
                fieldType="technologies"
                value={selectedData.technologies || []}
                loading={loading}
                error={error}
              />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              {loading ? (
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin">
                  Fetching latest updates...
                </div>
              ) : error ? (
                <div className="text-red-400 text-2xl">⚠️</div>
              ) : (
                <div className="w-40 h-40 bg-white">
                  <Image
                    src={`/experience/${selectedData.img}`}
                    alt={selectedData.company || 'Company logo'}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 科技感裝飾點 */}
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
