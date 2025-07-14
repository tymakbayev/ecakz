from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import requests
import os
import json
from datetime import datetime

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: str = ""
    message: str = ""
    product: str = "general"

@router.post("/contact")
async def submit_contact_form(form_data: ContactForm):
    """
    Handle contact form submission and send email via PHP script
    """
    try:
        # Prepare data for PHP email script
        php_data = {
            "name": form_data.name,
            "email": form_data.email,
            "phone": form_data.phone,
            "company": form_data.company,
            "message": form_data.message,
            "product": form_data.product
        }
        
        # In development, just log the submission
        print(f"[{datetime.now()}] Contact form submission:")
        print(f"Name: {form_data.name}")
        print(f"Email: {form_data.email}")
        print(f"Phone: {form_data.phone}")
        print(f"Company: {form_data.company}")
        print(f"Product: {form_data.product}")
        print(f"Message: {form_data.message}")
        
        return {
            "success": True,
            "message": "Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
            "id": f"evo_{int(datetime.now().timestamp())}"
        }
        
    except Exception as e:
        print(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Произошла ошибка при отправке сообщения")

@router.get("/products/{product_name}")
async def get_product_info(product_name: str):
    """
    Get product information and images
    """
    products = {
        "omilia": {
            "title": "OMILIA",
            "description": "Интеллектуальный голосовой и текстовый ассистент, предназначенный для оптимизации процессов обслуживания клиентов путем предоставления сервисов самообслуживания",
            "image": "/assets/products/omilia.jpg",
            "features": [
                "Голосовое распознавание",
                "Обработка естественного языка",
                "Интеграция с CRM системами",
                "Аналитика диалогов"
            ]
        },
        "evochat": {
            "title": "EVOCHAT", 
            "description": "Омниканальная чат-бот платформа для автоматизации коммуникации с клиентами посредством любых текстовых каналов, как с привлечением агентов, так и с помощью чат-ботов",
            "image": "/assets/products/evochat.jpg",
            "features": [
                "Омниканальность",
                "AI-powered боты",
                "Живые агенты",
                "Интеграция с мессенджерами"
            ]
        },
        "geostatus": {
            "title": "GEOSTATUS",
            "description": "Сервис предназначен для эффективного управления выездными задачами и процессами, а также учета рабочего времени с применением технологии геозонирования для сотрудников, осуществляющих работу на удаленном доступе.",
            "image": "/assets/products/geostatus.jpg", 
            "features": [
                "GPS отслеживание",
                "Геозонирование",
                "Учет рабочего времени",
                "Управление задачами"
            ]
        },
        "evobot": {
            "title": "EVOBOT",
            "description": "Интеллектуальная робототехническая платформа для автоматизации бизнес-процессов и выполнения рутинных задач",
            "image": "/assets/products/evobot.jpg",
            "features": [
                "Робототехнические решения",
                "Автоматизация процессов",
                "AI интеграция",
                "Адаптивное обучение"
            ]
        },
        "evomed": {
            "title": "EVOMED",
            "description": "Медицинская информационная система для управления медицинскими учреждениями и пациентами",
            "image": "/assets/products/evomed.jpg",
            "features": [
                "Управление пациентами",
                "Электронные карты",
                "Планирование процедур",
                "Медицинская аналитика"
            ]
        },
        "evoprompt": {
            "title": "EVOPROMPT", 
            "description": "Система управления промптами и AI-ассистентами для оптимизации работы с искусственным интеллектом",
            "image": "/assets/products/evoprompt.jpg",
            "features": [
                "Управление промптами",
                "AI оптимизация",
                "Шаблоны запросов",
                "Аналитика результатов"
            ]
        },
        "evosensus": {
            "title": "EVOSENSUS",
            "description": "Система сенсорного мониторинга и анализа данных для IoT устройств и промышленных решений",
            "image": "/assets/products/evosensus.jpg",
            "features": [
                "IoT мониторинг",
                "Сенсорные данные",
                "Аналитика в реальном времени",
                "Предиктивное обслуживание"
            ]
        },
        "evoshell": {
            "title": "EVOSHELL",
            "description": "Интерфейс командной строки и система управления серверами для IT администраторов",
            "image": "/assets/products/evoshell.jpg",
            "features": [
                "Командная строка",
                "Управление серверами",
                "Автоматизация задач",
                "Мониторинг систем"
            ]
        },
        "evotype": {
            "title": "EVOTYPE",
            "description": "Система распознавания и анализа текста с поддержкой машинного обучения",
            "image": "/assets/products/evotype.jpg",
            "features": [
                "Распознавание текста",
                "Машинное обучение",
                "Анализ документов",
                "OCR технологии"
            ]
        },
        "evologue": {
            "title": "EVOLOGUE",
            "description": "Система логирования и мониторинга приложений для анализа производительности",
            "image": "/assets/products/evologue.jpg",
            "features": [
                "Централизованное логирование",
                "Мониторинг приложений",
                "Анализ производительности",
                "Алерты и уведомления"
            ]
        },
        "campaignmanager": {
            "title": "CAMPAIGN MANAGER",
            "description": "Система управления маркетинговыми кампаниями и анализа эффективности рекламы",
            "image": "/assets/products/campaignmanager.jpg",
            "features": [
                "Управление кампаниями",
                "Аналитика эффективности",
                "Таргетинг аудитории",
                "ROI оптимизация"
            ]
        },
        "renata": {
            "title": "RENATA",
            "description": "Персональный AI-ассистент для управления задачами и повышения продуктивности",
            "image": "/assets/products/renata.jpg",
            "features": [
                "Персональный ассистент",
                "Управление задачами",
                "Планирование времени",
                "Продуктивность"
            ]
        }
    }
    
    if product_name not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return products[product_name]

@router.get("/products")
async def get_all_products():
    """
    Get all available products
    """
    products = [
        {
            "slug": "omilia",
            "title": "OMILIA",
            "description": "Интеллектуальный голосовой и текстовый ассистент",
            "image": "/assets/products/omilia.jpg"
        },
        {
            "slug": "evochat", 
            "title": "EVOCHAT",
            "description": "Омниканальная чат-бот платформа",
            "image": "/assets/products/evochat.jpg"
        },
        {
            "slug": "geostatus",
            "title": "GEOSTATUS", 
            "description": "Управление выездными задачами и геозонирование",
            "image": "/assets/products/geostatus.jpg"
        },
        {
            "slug": "evobot",
            "title": "EVOBOT",
            "description": "Робототехническая платформа для автоматизации",
            "image": "/assets/products/evobot.jpg"
        },
        {
            "slug": "evomed",
            "title": "EVOMED",
            "description": "Медицинская информационная система",
            "image": "/assets/products/evomed.jpg"
        },
        {
            "slug": "evoprompt",
            "title": "EVOPROMPT",
            "description": "Система управления AI-промптами",
            "image": "/assets/products/evoprompt.jpg"
        },
        {
            "slug": "evosensus",
            "title": "EVOSENSUS", 
            "description": "Сенсорный мониторинг и IoT решения",
            "image": "/assets/products/evosensus.jpg"
        },
        {
            "slug": "evoshell",
            "title": "EVOSHELL",
            "description": "Интерфейс командной строки и управление серверами",
            "image": "/assets/products/evoshell.jpg"
        },
        {
            "slug": "evotype",
            "title": "EVOTYPE", 
            "description": "Распознавание и анализ текста",
            "image": "/assets/products/evotype.jpg"
        },
        {
            "slug": "evologue",
            "title": "EVOLOGUE",
            "description": "Логирование и мониторинг приложений",
            "image": "/assets/products/evologue.jpg"
        },
        {
            "slug": "campaignmanager",
            "title": "CAMPAIGN MANAGER",
            "description": "Управление маркетинговыми кампаниями",
            "image": "/assets/products/campaignmanager.jpg"
        },
        {
            "slug": "renata",
            "title": "RENATA",
            "description": "Персональный AI-ассистент",
            "image": "/assets/products/renata.jpg"
        }
    ]
    
    return {"products": products}