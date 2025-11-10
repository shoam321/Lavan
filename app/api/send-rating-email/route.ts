import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const { ratings, average } = await request.json()

    const recipientEmail = process.env.RECIPIENT as string
    const studioName = "סטודיו דוראל אזולאי"

    const resend = new Resend(process.env.RESEND_API_KEY)

    const emailBody = `
    <html dir="rtl" lang="he" style="font-family: Arial, sans-serif;">
      <body style="background-color: #f5f5f5; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="text-align: center; color: #1f2937; margin-bottom: 20px;">📊 דעה חדשה התקבלה</h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">פירוט הדעה:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">החוויה הכללית:</td>
                <td style="padding: 12px; text-align: left; color: #6b7280;">${ratings.q1}/5 ⭐</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">איכות ההדרכה:</td>
                <td style="padding: 12px; text-align: left; color: #6b7280;">${ratings.q2}/5 ⭐</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">רמת השירות:</td>
                <td style="padding: 12px; text-align: left; color: #6b7280;">${ratings.q3}/5 ⭐</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">واء וניקיון:</td>
                <td style="padding: 12px; text-align: left; color: #6b7280;">${ratings.q4}/5 ⭐</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">המלצה:</td>
                <td style="padding: 12px; text-align: left; color: #6b7280;">${ratings.q5}/5 ⭐</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #16a34a;">
            <h3 style="color: #16a34a; margin: 0 0 10px 0;">הממוצע הכולל</h3>
            <p style="font-size: 32px; font-weight: bold; color: #16a34a; margin: 0;">${average.toFixed(1)}/5 ⭐</p>
          </div>

          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            דעה זו נשלחה מ-${studioName} · ${new Date().toLocaleString("he-IL")}
          </p>
        </div>
      </body>
    </html>
    `

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      subject: "דעה חדשה התקבלה - סטודיו דוראל אזולאי",
      html: emailBody,
    })

    console.log("[v0] Email sent successfully:", response)

    return NextResponse.json({
      success: true,
      message: "הדעה נשלחה בהצלחה",
      ratings,
      average: average.toFixed(1),
    })
  } catch (error) {
    console.error("[v0] Email send error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "אירעה שגיאה בשליחת הדעה",
      },
      { status: 500 },
    )
  }
}
