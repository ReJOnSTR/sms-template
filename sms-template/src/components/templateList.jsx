import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [smsHeaders, setSmsHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isHeaderListVisible, setIsHeaderListVisible] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    ad: "",
    mesaj: "",
    kilitli: false,
    smsBaslikId: "",
  });

  useEffect(() => {
    fetchTemplates();
    fetchSmsHeaders();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.215:51080/api/app/sms-sablon",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setTemplates(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error("Şablonlar yüklenirken hata oluştu:", error);
      setError(
        "Şablonlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
      setLoading(false);
    }
  };

  const fetchSmsHeaders = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.215:51080/api/app/sms-baslik",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setSmsHeaders(response.data.items);
    } catch (error) {
      console.error("SMS başlıkları yüklenirken hata oluştu:", error);
      setError(
        "SMS başlıkları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu şablonu silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(
          `http://192.168.1.215:51080/api/app/sms-sablon/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setTemplates(templates.filter((template) => template.id !== id));
      } catch (error) {
        console.error("Şablon silinirken hata oluştu:", error);
        setError(
          "Şablon silinirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleUpdate = async (updatedTemplate) => {
    try {
      await axios.put(
        `http://192.168.1.215:51080/api/app/sms-sablon/${updatedTemplate.id}`,
        updatedTemplate,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setTemplates(
        templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Şablon güncellenirken hata oluştu:", error);
      setError(
        "Şablon güncellenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    }
  };

  const handleCreate = async (template) => {
    try {
      const response = await axios.post(
        "http://192.168.1.215:51080/api/app/sms-sablon",
        template,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setTemplates([...templates, response.data]);
      setIsCreating(false);
      setNewTemplate({ ad: "", mesaj: "", kilitli: false, smsBaslikId: "" });
    } catch (error) {
      console.error("Yeni şablon oluşturulurken hata oluştu:", error);
      setError(
        "Yeni şablon oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    }
  };

  const getToken = () => {
    return "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRGOTY5MUQyMDk3RUExQ0QxODk5REZFRDg5QzM5NUNBQ0VENTQzQTkiLCJ4NXQiOiJUNWFSMGdsLW9jMFltZF90aWNPVnlzN1ZRNmsiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xLjIxNTo1MDA4MC8iLCJleHAiOjE3Mjk0OTg2NzQsImlhdCI6MTcyOTQ5NTA3NCwiYXVkIjoiTGF3YXN0Q3JtQXBpIiwic2NvcGUiOiJMYXdhc3RDcm1BcGkiLCJqdGkiOiI1NTE1NzM0Ny01ZmYxLTRiNzQtOWViNy02NDJiZGY1ZDBlYzEiLCJzdWIiOiIzYTE1ODU1My1mODQ0LTgzN2YtODQ1My1jNDQzN2VhOTUwYWYiLCJ1bmlxdWVfbmFtZSI6InN1cGVyYWRtaW4iLCJvaV9wcnN0IjoiTGF3YXN0Q3JtQXBpX1N3YWdnZXIiLCJvaV9hdV9pZCI6IjNhMTU4NTU1LTRkYTYtY2FhMy01OWU1LTU3OWYwNzE0MTYwZSIsInByZWZlcnJlZF91c2VybmFtZSI6InN1cGVyYWRtaW4iLCJnaXZlbl9uYW1lIjoiU3VwZXIiLCJmYW1pbHlfbmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGthcmFzb3kuY29tLnRyIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlcl92ZXJpZmllZCI6IkZhbHNlIiwiY2xpZW50X2lkIjoiTGF3YXN0Q3JtQXBpX1N3YWdnZXIiLCJvaV90a25faWQiOiIzYTE1YzAxZC01ZDVmLWUzNTctZjU4OS1lNjRlNzRiYjUzYzcifQ.COi6l1EVrnbl739__0baLRyasjeqZV_IXqMrHOhKvKFQrAFLQSngjr69GNkWVLoHptZ88q-RCP7I9aRrKBq2cocqWW1wV7-5G6KksRHMEV67beBbW8pK96dhbJ7PdS3AtYCYFAWEa2WS7geL3loZmBRMXhTzHUgo4jeIJcQUZDdAiabWHTXAyr8wG0nXXD5iPGu7r2bWo0kPyJtTNIY8fTruoqjXiCLseScxNCU_lAqUVufV8HRbQPEz-v7OnXgv41pC-UHhi3T5L5pz9c62wAGEcC-f5XNTbKRLqooeSb83Y3CLDEkr6VlNYg2fi_Opals-r4UpgLNC8yTSuXBndQ";
  };

  const toggleHeaderList = () => {
    setIsHeaderListVisible(!isHeaderListVisible);
    if (isCreating) setIsCreating(false);
  };

  const toggleNewTemplate = () => {
    setIsCreating(!isCreating);
    if (isHeaderListVisible) setIsHeaderListVisible(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">SMS Şablonları</h1>
        <div className="flex space-x-2">
          <button
            onClick={toggleHeaderList}
            className={`bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out ${
              isHeaderListVisible ? "bg-gray-600" : ""
            }`}
          >
            SMS Başlıkları
          </button>
          <button
            onClick={toggleNewTemplate}
            className={`bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out flex items-center ${
              isCreating ? "bg-gray-700" : ""
            }`}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Yeni Şablon
          </button>
        </div>
      </div>

      {error && (
        <div
          className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p className="font-bold">Hata</p>
          <p>{error}</p>
        </div>
      )}

      {isHeaderListVisible && (
        <HeaderList
          smsHeaders={smsHeaders}
          setSmsHeaders={setSmsHeaders}
          fetchSmsHeaders={fetchSmsHeaders}
          getToken={getToken}
        />
      )}

      {isCreating && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Yeni Şablon Oluştur</h2>
          <EditForm
            template={newTemplate}
            smsHeaders={smsHeaders}
            onSave={(template) => {
              handleCreate(template);
            }}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-lg overflow-hidden mb-8"
      >
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  SMS Başlığı
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mesaj
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kilitli
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Oluşturulma Zamanı
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {templates.map((template) => (
                <React.Fragment key={template.id}>
                  <motion.tr
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {template.ad}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {smsHeaders.find((h) => h.id === template.smsBaslikId)
                        ?.ad || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs overflow-hidden break-words">
                        {template.mesaj}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          template.kilitli
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {template.kilitli ? "Evet" : "Hayır"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(template.creationTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(template.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors duration-200"
                      >
                        <PencilSquareIcon className="h-5 w-5 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        <TrashIcon className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </motion.tr>
                  {editingId === template.id && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4">
                        <EditForm
                          template={template}
                          smsHeaders={smsHeaders}
                          onSave={handleUpdate}
                          onCancel={() => setEditingId(null)}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function EditForm({ template, smsHeaders, onSave, onCancel }) {
  const [editedTemplate, setEditedTemplate] = useState(template);
  const [error, setError] = useState(null);

  const handleSave = () => {
    if (
      !editedTemplate.ad.trim() ||
      !editedTemplate.mesaj.trim() ||
      !editedTemplate.smsBaslikId
    ) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    setError(null);
    onSave(editedTemplate);
  };

  return (
    <div className="space-y-4">
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}
      <input
        type="text"
        value={editedTemplate.ad}
        onChange={(e) =>
          setEditedTemplate({ ...editedTemplate, ad: e.target.value })
        }
        placeholder="Şablon Adı"
        className="w-full p-2 border rounded"
      />
      <div className="relative">
        <select
          value={editedTemplate.smsBaslikId}
          onChange={(e) =>
            setEditedTemplate({
              ...editedTemplate,
              smsBaslikId: e.target.value,
            })
          }
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">SMS Başlığı Seçin</option>
          {smsHeaders.map((header) => (
            <option key={header.id} value={header.id}>
              {header.ad}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
      <textarea
        value={editedTemplate.mesaj}
        onChange={(e) =>
          setEditedTemplate({
            ...editedTemplate,
            mesaj: e.target.value.slice(0, 150),
          })
        }
        placeholder="Mesaj (En fazla 150 karakter)"
        className="w-full p-2 border rounded"
        rows="4"
        maxLength="150"
      />
      <p className="text-sm text-gray-500">
        {editedTemplate.mesaj.length}/150 karakter
      </p>
      <div className="relative">
        <select
          value={editedTemplate.kilitli}
          onChange={(e) =>
            setEditedTemplate({
              ...editedTemplate,
              kilitli: e.target.value === "true",
            })
          }
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="true">Kilitli</option>
          <option value="false">Kilitli Değil</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleSave}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Kaydet
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          İptal
        </button>
      </div>
    </div>
  );
}

function HeaderList({ smsHeaders, setSmsHeaders, fetchSmsHeaders, getToken }) {
  const [newHeader, setNewHeader] = useState("");
  const [editingHeaderId, setEditingHeaderId] = useState(null);
  const [editedHeaderName, setEditedHeaderName] = useState("");

  const handleAddHeader = async () => {
    if (!newHeader.trim()) return;

    try {
      const response = await axios.post(
        "http://192.168.1.215:51080/api/app/sms-baslik",
        { ad: newHeader },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setSmsHeaders([...smsHeaders, response.data]);
      setNewHeader("");
    } catch (error) {
      console.error("SMS başlığı eklenirken hata oluştu:", error);
    }
  };

  const handleDeleteHeader = async (id) => {
    if (
      window.confirm("Bu SMS başlığını silmek istediğinizden emin misiniz?")
    ) {
      try {
        await axios.delete(
          `http://192.168.1.215:51080/api/app/sms-baslik/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setSmsHeaders(smsHeaders.filter((header) => header.id !== id));
      } catch (error) {
        console.error("SMS başlığı silinirken hata oluştu:", error);
      }
    }
  };

  const handleEditHeader = (id, currentName) => {
    setEditingHeaderId(id);
    setEditedHeaderName(currentName);
  };

  const handleUpdateHeader = async () => {
    if (!editedHeaderName.trim()) return;

    try {
      await axios.put(
        `http://192.168.1.215:51080/api/app/sms-baslik/${editingHeaderId}`,
        { ad: editedHeaderName },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      fetchSmsHeaders(); // Başlıkları yeniden yükle
      setEditingHeaderId(null);
      setEditedHeaderName("");
    } catch (error) {
      console.error("SMS başlığı güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">SMS Başlıkları</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newHeader}
          onChange={(e) => setNewHeader(e.target.value)}
          placeholder="Yeni SMS Başlığı"
          className="flex-grow mr-2 p-2 border rounded"
        />
        <button
          onClick={handleAddHeader}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Ekle
        </button>
      </div>
      <ul>
        {smsHeaders.map((header) => (
          <li
            key={header.id}
            className="flex items-center justify-between py-2 border-b"
          >
            {editingHeaderId === header.id ? (
              <>
                <input
                  type="text"
                  value={editedHeaderName}
                  onChange={(e) => setEditedHeaderName(e.target.value)}
                  className="flex-grow mr-2 p-1 border rounded"
                />
                <div>
                  <button
                    onClick={handleUpdateHeader}
                    className="text-green-600 hover:text-green-900 mr-2"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingHeaderId(null)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    İptal
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{header.ad}</span>
                <div>
                  <button
                    onClick={() => handleEditHeader(header.id, header.ad)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <PencilSquareIcon className="h-5 w-5 inline" />
                  </button>
                  <button
                    onClick={() => handleDeleteHeader(header.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TemplateList;
