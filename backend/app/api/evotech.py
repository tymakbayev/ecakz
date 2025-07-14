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
        }
    }
    
    if product_name not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return products[product_name]