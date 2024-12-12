'use client'

import React, { useState, useEffect } from 'react';
import { Card, BarChart, Title, Text } from '@tremor/react';
import { dashboardPaymentsCard_data } from '../../../data/ApiController.js';
import { Link } from 'react-router-dom';

const categoryMapping = {
    booking: "Installations",
    Referral_Monthly: "Installer Referral Purchase (Monthly)",
    Referral_Annual: "Installer Referral Purchase (Annual)",
    Priority_Monthly: "Installer Priority Placement Purchase (Monthly)",
    Priority_Annual: "Installer Priority Placement Purchase (Annual)",
    purchase: "Charger Purchased (App)",
    "E-commerce Orders": "Charger Purchased (Web)",
    "Insurance-Based Payments": "Booking Insurance"
};

const TransactionAnalyticsCard = () => {
    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const response = await dashboardPaymentsCard_data();
                const data = response.data;
                const categoriesSummary = data.categoriesSummary;

                const formattedData = categoriesSummary.map(item => ({
                    name: categoryMapping[item.category] || item.category,
                    totalAmount: parseFloat(item.totalAmount),
                    averageAmount: parseFloat(item.averageAmount),
                    count: parseInt(item.count),
                }));

                setTransactionData(formattedData);
            } catch (error) {
                console.error('Error fetching transaction data:', error);
            }
        };

        fetchTransactionData();
    }, []);

    return (
        <div className="min-h-screen">
            <StripeBanner />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-white mb-8">Transaction Analytics Dashboard</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-opacity-20 backdrop-filter backdrop-blur-lg bg-gray-800 ">
                        <Title className="text-white mb-4">Total Amount by Category</Title>
                        <BarChart
                            data={transactionData}
                            index="name"
                            categories={["totalAmount"]}
                            colors={["blue"]}
                            valueFormatter={(number) => `$${number.toLocaleString()}`}
                            yAxisWidth={80}
                            className="h-80"
                        />
                    </Card>
                    <Card className="bg-opacity-20 backdrop-filter backdrop-blur-lg bg-gray-800 ">
                        <Title className="text-white mb-4">Transaction Count by Category</Title>
                        <BarChart
                            data={transactionData}
                            index="name"
                            categories={["count"]}
                            colors={["green"]}
                            valueFormatter={(number) => number.toLocaleString()}
                            yAxisWidth={80}
                            className="h-80"
                        />
                    </Card>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {transactionData.map((category) => (
                        <Card
                            key={category.name}
                            className="bg-opacity-20 backdrop-filter backdrop-blur-lg bg-gray-800  hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            <Title className="text-white mb-4">{category.name}</Title>
                            <div className="space-y-4">
                                <div>
                                    <Text className="text-gray-400">Total Amount</Text>
                                    <Text className="text-2xl font-bold text-blue-400">
                                        ${category.totalAmount.toLocaleString()}
                                    </Text>
                                </div>
                                <div>
                                    <Text className="text-gray-400">Average Amount</Text>
                                    <Text className="text-2xl font-bold text-green-400">
                                        ${category.averageAmount.toLocaleString()}
                                    </Text>
                                </div>
                                <div>
                                    <Text className="text-gray-400">Transaction Count</Text>
                                    <Text className="text-2xl font-bold text-purple-400">
                                        {category.count.toLocaleString()}
                                    </Text>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionAnalyticsCard;

const StripeBanner = () => {
    return (
        <div className="bg-gradient-to-r from-lime-600 to-sky-600 text-white py-2 px-4 text-sm font-medium rounded-lg">
            <div className="container mx-auto flex items-center justify-between">
                <span>Access the complete financial records</span>
                <a href="https://dashboard.stripe.com" className="underline hover:text-purple-200 transition-colors">
                    Stripe now →
                </a>
            </div>
        </div>
    );
};
